"use client";
import { useEffect } from "react";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";
import { GenericName } from "@/generated/prisma/index.d 2";

const DrugsStoreInitializer = ({ drugs }: { drugs: GenericName[] }) => {
  const { setDrugs } = useDrugsInventoryStore();
  useEffect(() => {
    setDrugs(drugs);
  }, [drugs, setDrugs]);

  return null;
};

export default DrugsStoreInitializer;
