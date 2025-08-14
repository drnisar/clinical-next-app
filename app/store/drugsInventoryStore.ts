import { GenericName } from "@/generated/prisma";
import { create } from "zustand";

interface Props {
  drugs: GenericName[];
  setDrugs: (drugs: GenericName[]) => void;
}

export const useDrugsInventoryStore = create<Props>((set) => ({
  drugs: [],
  setDrugs: (drugs) => set({ drugs }),
}));
