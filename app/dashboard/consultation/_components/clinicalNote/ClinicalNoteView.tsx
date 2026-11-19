"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo } from "react";
import {
  omitSections,
  type NoteDoc,
  type NoteSectionKey,
} from "./clinicalNote";

interface Props {
  doc: NoteDoc;
  /** Sections to leave out, e.g. ["instructions"] on the print report. */
  omit?: NoteSectionKey[];
  className?: string;
}

/**
 * Read-only rendering of a Clinical Note. Rendered through the editor's schema
 * (not raw HTML), so stored content can't inject markup.
 */
const ClinicalNoteView = ({ doc, omit = [], className = "" }: Props) => {
  const omitKey = omit.join(",");
  const content = useMemo(
    () =>
      omitKey ? omitSections(doc, omitKey.split(",") as NoteSectionKey[]) : doc,
    [doc, omitKey],
  );

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
    content,
    editorProps: {
      attributes: { class: `clinical-note ${className}`.trim() },
    },
  });

  // Follow updates (e.g. after a save refreshes the page).
  const serialized = JSON.stringify(content);
  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== serialized) {
      editor.commands.setContent(JSON.parse(serialized), false);
    }
  }, [editor, serialized]);

  return <EditorContent editor={editor} />;
};

export default ClinicalNoteView;
