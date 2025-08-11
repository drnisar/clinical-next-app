"use client";
import useDischargePageStore from "@/app/store/dischargePageStore";
import {
  Admission_Discharge,
  Registration,
  MedsTemplate,
  OT,
} from "@/generated/prisma";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  admission: Admission_Discharge;
  registration: Registration;
  templates: MedsTemplate[];
  otNotesArray: OT[];
}
const DischargePageProvider = ({
  children,
  admission,
  registration,
  templates,
  otNotesArray,
}: Props) => {
  const { initializePageData, clearPageData } = useDischargePageStore();

  useEffect(() => {
    initializePageData({
      admission,
      registration,
      templates,
      otNotesArray,
    });

    return () => {
      clearPageData();
    };
  }, [
    admission,
    registration,
    templates,
    otNotesArray,
    initializePageData,
    clearPageData,
  ]);
  return <>{children}</>;
};

export default DischargePageProvider;
