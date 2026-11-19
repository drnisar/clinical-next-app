"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

interface Options<T> {
  /** Sends one save. `keepalive` is set when flushing while the page changes. */
  save: (payload: T, opts: { keepalive: boolean }) => Promise<void>;
  /** Called after each successful save (e.g. router.refresh()). */
  onSaved?: () => void;
  /** Autosave delay after the last change. */
  delayMs?: number;
  /** Ctrl/Cmd+S saves now (only when there are unsaved changes). */
  saveShortcut?: boolean;
}

/**
 * Autosave shared by the Clinical Note and the medications form:
 * - `markChanged(payload)` after each edit; it saves `delayMs` after the last one;
 * - `saveNow()` for the Save button;
 * - saves run one after another, so the last edit is always the one stored, and
 *   an older save finishing never reports "Saved" over newer edits;
 * - unsaved edits are sent (keepalive) when the component unmounts, and the
 *   browser warns before closing the tab with unsaved changes.
 */
export function useQueuedAutosave<T>({
  save,
  onSaved,
  delayMs = 2000,
  saveShortcut = true,
}: Options<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const editVersion = useRef(0);
  const savedVersion = useRef(0);
  const latest = useRef<{ payload: T } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  // Latest callbacks without re-creating saveNow/markChanged.
  const saveRef = useRef(save);
  const onSavedRef = useRef(onSaved);
  saveRef.current = save;
  onSavedRef.current = onSaved;

  const saveNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!latest.current) return;
    const { payload } = latest.current;
    const version = editVersion.current;
    setStatus("saving");
    queue.current = queue.current.then(async () => {
      try {
        await saveRef.current(payload, { keepalive: false });
        savedVersion.current = Math.max(savedVersion.current, version);
        if (version === editVersion.current) {
          setStatus("saved");
          setSavedAt(new Date());
        } else {
          setStatus("dirty"); // newer edits are waiting for their own save
        }
        onSavedRef.current?.();
      } catch (error) {
        console.error("Autosave failed:", error);
        if (version === editVersion.current) setStatus("error");
      }
    });
  }, []);

  const markChanged = useCallback(
    (payload: T) => {
      latest.current = { payload };
      editVersion.current += 1;
      setStatus("dirty");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(saveNow, delayMs);
    },
    [saveNow, delayMs],
  );

  /** Set the current content without marking it changed (initial value). */
  const setBaseline = useCallback((payload: T) => {
    latest.current = { payload };
  }, []);

  const hasUnsaved = () => editVersion.current > savedVersion.current;

  useEffect(() => {
    if (!saveShortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (hasUnsaved()) saveNow();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveShortcut, saveNow]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsaved()) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // Leaving with unsaved edits: send them now (keepalive survives navigation).
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (hasUnsaved() && latest.current) {
        saveRef
          .current(latest.current.payload, { keepalive: true })
          .catch((error) => console.error("Saving on leave failed:", error));
      }
    },
    [],
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

  return { status, statusText, markChanged, saveNow, setBaseline };
}

/** PATCH helper for the autosave `save` option. Throws on a non-2xx reply. */
export const patchJson = async (
  url: string,
  body: unknown,
  { keepalive }: { keepalive: boolean },
) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
};
