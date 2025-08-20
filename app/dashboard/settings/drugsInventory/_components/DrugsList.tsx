"use client";
import { GenericName } from "@/generated/prisma";
import React, { useState, useRef } from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";

const DrugsList = () => {
  const [selectedDrug, setSelectedDrug] = useState<GenericName | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const { setDrug, searchString, drugs } = useDrugsInventoryStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredDrugs =
    searchString === ""
      ? []
      : drugs.filter((drug) =>
          drug.generic_name.toLowerCase().includes(searchString.toLowerCase())
        );

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (filteredDrugs.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredDrugs.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredDrugs.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      setSelectedDrug(filteredDrugs[highlightedIndex]);
      setDrug(filteredDrugs[highlightedIndex]);
    } else if (e.key === "Escape") {
      setHighlightedIndex(-1);
      setSelectedDrug(null);
    }
  };

  return (
    <>
      <div
        className="flex flex-col gap-1 p-4 border rounded-md shadow-sm"
        tabIndex={0}
        ref={containerRef}
        onKeyDown={handleKeyDown}
        style={{ outline: "none" }}
      >
        {filteredDrugs.length > 0 && (
          <div>
            {filteredDrugs.map((drug, idx) => (
              <div
                key={drug.generic_id}
                className={`p-2 border-b border-gray-200 ${
                  selectedDrug?.generic_id === drug.generic_id
                    ? "bg-blue-100"
                    : highlightedIndex === idx
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() => {
                  setSelectedDrug(drug);
                  setDrug(drug);
                  setHighlightedIndex(idx);
                }}
              >
                {drug.generic_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DrugsList;
