"use client";
import { useEffect } from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";
import { GenericName } from "@/generated/prisma";
const DrugsStoreInitializer = ({ drugs }: { drugs: GenericName[] }) => {
  const { setDrugs } = useDrugsInventoryStore();
  useEffect(() => {
    setDrugs(drugs);
  }, [drugs, setDrugs]);

  return null;
};

export default DrugsStoreInitializer;
