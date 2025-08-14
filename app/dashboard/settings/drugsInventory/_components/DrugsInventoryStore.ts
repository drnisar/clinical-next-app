import { GenericName } from "@/generated/prisma";
import { create } from "zustand";

interface Props {
  drugs: GenericName[];
  drug: GenericName;
  setDrugs: (drugs: GenericName[]) => void;
  setDrug: (drug: GenericName) => void;
}

export const useDrugsInventoryStore = create<Props>((set) => ({
  drugs: [],
  drug: {} as GenericName,
  setDrugs: (drugs) => set({ drugs }),
  setDrug: (drug) => set({ drug }),
}));
export const clearDrugsInventoryStore = () => {
  useDrugsInventoryStore.setState({
    drugs: [],
    drug: {} as GenericName,
  });
};

export const initializeDrugsInventoryStore = (
  drugs: GenericName[],
  drug: GenericName
) => {
  useDrugsInventoryStore.setState({ drugs, drug });
};
