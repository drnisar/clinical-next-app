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
import { useState } from "react";
import { patchJson, useQueuedAutosave } from "@/lib/useQueuedAutosave";
import {
  NOTE_HEADING_LEVEL,
  NOTE_HEADINGS,
  headingSection,
  type NoteDoc,
  type NoteNode,
  type NoteSectionKey,
} from "./clinicalNote";

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
  const [present, setPresent] = useState<Set<NoteSectionKey>>(new Set());

  const { status, statusText, markChanged, saveNow, setBaseline } =
    useQueuedAutosave<object>({
      save: (doc, opts) =>
        patchJson(
          `/api/consultation/${consultationId}`,
          { clinical_note: doc },
          opts,
        ),
      onSaved: () => router.refresh(), // summary + ✓ marks
      delayMs: AUTOSAVE_MS,
    });

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
    onCreate: ({ editor }) => {
      setPresent(presentSections(editor));
      setBaseline(editor.getJSON()); // Save works before any edit
    },
    onUpdate: ({ editor }) => {
      setPresent(presentSections(editor));
      markChanged(editor.getJSON());
    },
  });
  const save = saveNow;

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
