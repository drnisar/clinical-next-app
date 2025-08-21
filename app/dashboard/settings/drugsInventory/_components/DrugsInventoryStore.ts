import { GenericName } from "@/generated/prisma";
import { create } from "zustand";

interface Props {
  drugs: GenericName[];
  drug: GenericName;
  searchString: string;
  addDrugButtonVisible: boolean;
  setAddDrugButtonVisible: (visible: boolean) => void;
  setSearchString: (searchString: string) => void;
  setDrugs: (drugs: GenericName[]) => void;
  setDrug: (drug: GenericName) => void;
}

export const useDrugsInventoryStore = create<Props>((set) => ({
  drugs: [],
  drug: {} as GenericName,
  searchString: "",
  addDrugButtonVisible: false,
  setAddDrugButtonVisible: (visible) => set({ addDrugButtonVisible: visible }),
  setDrugs: (drugs) => set({ drugs }),
  setDrug: (drug) => set({ drug }),
  setSearchString: (searchString) => set({ searchString }),
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
