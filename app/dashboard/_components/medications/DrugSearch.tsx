"use client";
import { Text, TextField } from "@radix-ui/themes";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { formatUsual, searchDrugs, type FrequentDrug } from "./medicationHelpers";

interface Props {
  /** The registered drug_name input. */
  field: UseFormRegisterReturn;
  index: number;
  drugs: FrequentDrug[];
  /** A suggestion was chosen (fill its usual dosing). */
  onPick: (drug: FrequentDrug) => void;
  /** Enter with no suggestion highlighted. */
  onEnter: () => void;
  autoFocus?: boolean;
}

/**
 * Drug-name search box: shows only the drugs matching what has been typed
 * (most prescribed first) in a short list under the field, with each drug's
 * usual dosing. Works by tap, mouse, or ↑/↓ + Enter; Esc closes it.
 * Free text is allowed: a drug not in the list is simply typed in full.
 */
const DrugSearch = ({ field, index, drugs, onPick, onEnter, autoFocus }: Props) => {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const matches = useMemo(() => searchDrugs(drugs, query), [drugs, query]);
  // Hide the list once the text is exactly the only match (already chosen).
  const showList =
    open &&
    matches.length > 0 &&
    !(matches.length === 1 && matches[0].drug_name.toLowerCase() === query.trim().toLowerCase());

  // Keep the list on screen (phones: above the keyboard) when it opens.
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (showList) listRef.current?.scrollIntoView({ block: "nearest" });
  }, [showList]);

  const pick = (drug: FrequentDrug) => {
    onPick(drug);
    setQuery(drug.drug_name);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showList && e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % matches.length);
    } else if (showList && e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? matches.length - 1 : a - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter") {
      e.preventDefault(); // never submit the form
      if (showList && active >= 0) pick(matches[active]);
      else onEnter();
    }
  };

  return (
    <div className="relative">
      <TextField.Root
        {...field}
        onChange={(e) => {
          field.onChange(e);
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onBlur={(e) => {
          field.onBlur(e);
          setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        autoCapitalize="characters"
        enterKeyHint="next"
        placeholder="Search drug…"
        size="2"
        className="uppercase"
        data-med-name={index}
        autoFocus={autoFocus}
      />
      {showList && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="med-search-list absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-md border p-1 shadow-lg"
        >
          {matches.map((d, i) => (
            <li
              key={d.drug_name}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              // Keep focus in the input so the list doesn't close before the click.
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => pick(d)}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer flex-col rounded px-2 py-1.5 ${i === active ? "med-search-active" : ""}`}
            >
              <Text size="2" weight="medium" className="uppercase">
                {d.drug_name}
              </Text>
              <Text size="1" color="gray">
                {formatUsual(d.usual)}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugSearch;
