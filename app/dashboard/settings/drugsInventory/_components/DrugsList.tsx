"use client";
import { GenericName } from "@/generated/prisma";
import React, { useState } from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";

interface Props {
  drugs: GenericName[];
}

const DrugsList = ({ drugs }: Props) => {
  const [className, setClassName] = useState("");
  const { setDrug } = useDrugsInventoryStore();
  const [selectedDrug, setSelectedDrug] = useState<GenericName | null>(null);
  const handleDrugClick = (drug: GenericName) => {
    setSelectedDrug(drug);
    setClassName("bg-blue-500 text-white");
    setDrug(drug);
  };
  return (
    <div>
      <h2>Drugs List</h2>
      <ul>
        {drugs.map((drug) => (
          <li
            key={drug.generic_id}
            onClick={() => handleDrugClick(drug)}
            className={selectedDrug === drug ? className : ""}
          >
            {drug.generic_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugsList;
