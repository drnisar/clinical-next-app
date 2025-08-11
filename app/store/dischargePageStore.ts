import {
  Admission_Discharge,
  MedsTemplate,
  OT,
  Registration,
} from "@/generated/prisma";
import { create } from "zustand";

interface Props {
  //data
  admission: Admission_Discharge | null;
  registration: Registration | null;
  templates: MedsTemplate[];
  otNotesArray: OT[];

  // loading states
  isLoading: boolean;

  // actions
  setAdmission: (admission: Admission_Discharge) => void;
  setRegistration: (registration: Registration) => void;
  setTemplates: (templates: MedsTemplate[]) => void;
  setOTNotesArray: (otNotesArray: OT[]) => void;

  // Initialize all data at once
  initializePageData: (data: {
    admission: Admission_Discharge;
    registration: Registration;
    templates: MedsTemplate[];
    otNotesArray: OT[];
  }) => void;

  // clear page data
  clearPageData: () => void;

  isDischargeReady: () => boolean;
}

const useDischargePageStore = create<Props>((set, get) => ({
  // data
  admission: null,
  registration: null,
  templates: [],
  otNotesArray: [],

  // loading states
  isLoading: false,

  // actions
  setAdmission: (admission: Admission_Discharge) => set({ admission }),
  setRegistration: (registration: Registration) => set({ registration }),
  setTemplates: (templates: MedsTemplate[]) => set({ templates }),
  setOTNotesArray: (otNotesArray: OT[]) => set({ otNotesArray }),

  // initialize all data at once
  initializePageData: (data) => {
    set({
      admission: data.admission,
      registration: data.registration,
      templates: data.templates,
      otNotesArray: data.otNotesArray,
    });
  },

  // clear page data
  clearPageData: () => {
    set({
      admission: null,
      registration: null,
      templates: [],
      otNotesArray: [],
    });
  },

  isDischargeReady: () => {
    const { admission, registration, templates, otNotesArray } = get();
    return !!(
      admission &&
      registration &&
      templates.length > 0 &&
      otNotesArray.length > 0
    );
  },
}));

export default useDischargePageStore;
