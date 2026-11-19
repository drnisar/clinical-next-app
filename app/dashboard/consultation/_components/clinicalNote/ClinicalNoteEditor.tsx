"use client";
import { Button, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import {
  CheckIcon,
  FontBoldIcon,
  ListBulletIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextSelection } from "@tiptap/pm/state";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NOTE_HEADING_LEVEL,
  NOTE_HEADINGS,
  headingSection,
  type NoteDoc,
  type NoteNode,
  type NoteSectionKey,
} from "./clinicalNote";

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";
const AUTOSAVE_MS = 2000;

/** Sections whose heading is present in the editor. */
const presentSections = (editor: Editor) => {
  const keys = new Set<NoteSectionKey>();
  editor.state.doc.forEach((node) => {
    const key = headingSection(node.toJSON() as NoteNode);
    if (key) keys.add(key);
  });
  return keys;
};

/**
 * Heading button: if that section already exists, put the cursor at the end
 * of it; otherwise insert the heading at the cursor with an empty line below.
 */
const insertOrJumpToHeading = (
  editor: Editor,
  key: NoteSectionKey,
  label: string,
) => {
  const { doc } = editor.state;
  let headingPos = -1;
  let sectionEnd = doc.content.size;
  doc.forEach((node, offset) => {
    const k = headingSection(node.toJSON() as NoteNode);
    if (!k) return;
    if (headingPos === -1 && k === key) headingPos = offset;
    else if (
      headingPos !== -1 &&
      offset > headingPos &&
      sectionEnd === doc.content.size
    )
      sectionEnd = offset;
  });

  if (headingPos !== -1) {
    const heading = doc.nodeAt(headingPos)!;
    const afterHeading = headingPos + heading.nodeSize;
    editor
      .chain()
      .focus()
      .command(({ tr, state }) => {
        if (afterHeading >= sectionEnd) {
          // Empty section: add a line under the heading and go there.
          tr.insert(afterHeading, state.schema.nodes.paragraph.create());
          tr.setSelection(TextSelection.near(tr.doc.resolve(afterHeading + 1)));
        } else {
          // Nearest text position at the end of the section (also inside lists).
          tr.setSelection(TextSelection.near(tr.doc.resolve(sectionEnd), -1));
        }
        return true;
      })
      .scrollIntoView()
      .run();
    return;
  }

  editor
    .chain()
    .focus()
    .insertContent([
      {
        type: "heading",
        attrs: { level: NOTE_HEADING_LEVEL },
        content: [{ type: "text", text: label }],
      },
      { type: "paragraph" },
    ])
    .scrollIntoView()
    .run();
};

interface Props {
  consultationId: string;
  /** Stored note, or one built from the old fields (see noteForConsultation). */
  initialDoc: NoteDoc;
}

/**
 * The single Clinical Note: rich text with heading buttons, autosave (2 s after
 * typing stops), a Save button and Ctrl/Cmd+S. Saves are sent one after
 * another, so the last edit always wins; the page refreshes after each save so
 * the summary and ✓ marks update.
 */
const ClinicalNoteEditor = ({ consultationId, initialDoc }: Props) => {
  const router = useRouter();
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [present, setPresent] = useState<Set<NoteSectionKey>>(new Set());

  const editVersion = useRef(0); // bumps on every edit
  const savedVersion = useRef(0); // version of the last successful save
  const latestDoc = useRef<object | null>(null); // content of the last edit
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const saveRef = useRef<() => void>(() => {});

  const editor = useEditor({
    immediatelyRender: false, // Next.js: render on the client only
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        code: false,
        codeBlock: false,
      }),
    ],
    content: initialDoc,
    editorProps: {
      attributes: {
        class: "clinical-note clinical-note-editor",
        "aria-label": "Clinical note",
        role: "textbox",
        "aria-multiline": "true",
      },
    },
    onCreate: ({ editor }) => setPresent(presentSections(editor)),
    onUpdate: ({ editor }) => {
      setPresent(presentSections(editor));
      editVersion.current += 1;
      latestDoc.current = editor.getJSON();
      setStatus("dirty");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => saveRef.current(), AUTOSAVE_MS);
    },
  });

  const save = useCallback(() => {
    if (!editor) return;
    if (timer.current) clearTimeout(timer.current);
    const version = editVersion.current;
    const doc = editor.getJSON();
    setStatus("saving");
    // One save at a time, in order: the last edit is always the one stored.
    queue.current = queue.current.then(async () => {
      try {
        const res = await fetch(`/api/consultation/${consultationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clinical_note: doc }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        savedVersion.current = Math.max(savedVersion.current, version);
        if (version === editVersion.current) {
          setStatus("saved");
          setSavedAt(new Date());
        } else {
          setStatus("dirty"); // newer edits are waiting for their own save
        }
        router.refresh(); // summary + ✓ marks
      } catch (error) {
        console.error("Saving clinical note failed:", error);
        if (version === editVersion.current) setStatus("error");
      }
    });
  }, [editor, consultationId, router]);
  saveRef.current = save;

  // Ctrl/Cmd+S saves now.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === "dirty" || status === "saving" || status === "error") {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [status]);

  // Leaving the note (another patient, another page) with edits not yet
  // saved: send them now. keepalive lets the request finish during navigation.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (editVersion.current > savedVersion.current && latestDoc.current) {
        fetch(`/api/consultation/${consultationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clinical_note: latestDoc.current }),
          keepalive: true,
        }).catch((error) =>
          console.error("Saving clinical note on leave failed:", error),
        );
      }
    },
    [consultationId],
  );

  const statusText =
    status === "saving"
      ? "Saving…"
      : status === "dirty"
        ? "Unsaved changes"
        : status === "error"
          ? "Save failed — retry"
          : status === "saved" && savedAt
            ? `Saved · ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : "";

  return (
    <Flex direction="column" gap="2">
      <Flex justify="between" align="center" gap="2" wrap="wrap">
        <Text weight="bold" size="4">
          Clinical Note
        </Text>
        <Flex align="center" gap="2">
          <Text
            size="1"
            color={status === "error" ? "red" : "gray"}
            aria-live="polite"
          >
            {statusText}
          </Text>
          <Button
            size="2"
            variant={status === "error" ? "solid" : "soft"}
            color={status === "error" ? "red" : undefined}
            onClick={save}
            disabled={!editor || status === "saving"}
          >
            {status === "error" ? "Retry save" : "Save"}
          </Button>
        </Flex>
      </Flex>

      {/* Toolbar: stays visible while scrolling a long note */}
      <div
        role="toolbar"
        aria-label="Clinical note headings and formatting"
        className="sticky z-20 rounded-md border p-1"
        style={{
          top: "calc(var(--dashboard-nav-h, 0px) + var(--patient-bar-h, 0px))",
          background: "var(--color-panel-solid)",
        }}
      >
        <Flex gap="1" wrap="wrap" align="center">
          {NOTE_HEADINGS.map((h) => (
            <Button
              key={h.key}
              size="1"
              variant={present.has(h.key) ? "soft" : "outline"}
              color={present.has(h.key) ? "green" : undefined}
              disabled={!editor}
              onMouseDown={(e) => e.preventDefault()} // keep the cursor
              onClick={() =>
                editor && insertOrJumpToHeading(editor, h.key, h.label)
              }
              title={
                present.has(h.key)
                  ? `Go to ${h.label}`
                  : `Insert ${h.label} heading`
              }
            >
              {present.has(h.key) && <CheckIcon />}
              {h.label}
            </Button>
          ))}
          <Separator orientation="vertical" mx="1" />
          <IconButton
            size="1"
            variant={editor?.isActive("bold") ? "solid" : "ghost"}
            aria-label="Bold"
            title="Bold (Ctrl/Cmd+B)"
            disabled={!editor}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <FontBoldIcon />
          </IconButton>
          <IconButton
            size="1"
            variant={editor?.isActive("bulletList") ? "solid" : "ghost"}
            aria-label="Bullet list"
            title="Bullet list"
            disabled={!editor}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon />
          </IconButton>
          <IconButton
            size="1"
            variant="ghost"
            aria-label="Undo"
            title="Undo (Ctrl/Cmd+Z)"
            disabled={!editor?.can().undo()}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <ResetIcon />
          </IconButton>
          <IconButton
            size="1"
            variant="ghost"
            aria-label="Redo"
            title="Redo (Ctrl/Cmd+Shift+Z)"
            disabled={!editor?.can().redo()}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <ResetIcon style={{ transform: "scaleX(-1)" }} />
          </IconButton>
        </Flex>
      </div>

      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <div className="clinical-note clinical-note-editor" aria-busy="true">
          <Text color="gray" size="2">
            Loading editor…
          </Text>
        </div>
      )}
    </Flex>
  );
};

export default ClinicalNoteEditor;
