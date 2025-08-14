"use client";
import React from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";

const SelectedDrug = () => {
  const { drug } = useDrugsInventoryStore();
  return (
    <div>
      <h2>Selected Drug</h2>
      <p>Name: {drug.generic_name}</p>
    </div>
  );
};

export default SelectedDrug;
