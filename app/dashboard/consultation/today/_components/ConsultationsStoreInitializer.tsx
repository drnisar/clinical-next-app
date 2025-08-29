"use client";
import { useEffect } from "react";
import {
  ConsultationWithRegistration,
  useConsultations,
  useConsultationStatus,
} from "../../_components/ConsultationStore";

interface Props {
  consultationsFromPage: ConsultationWithRegistration[];
}

const ConsultationsStoreInitializer = ({ consultationsFromPage }: Props) => {
  const { setConsultations } = useConsultations();
  const { status } = useConsultationStatus();

  useEffect(() => {
    console.log("Status from <ConsultationsStoreInitializer />:", status);
    if (status === "ALL") {
      setConsultations(consultationsFromPage);
    } else {
      setConsultations(
        consultationsFromPage.filter(
          (consultation) => consultation.status === status
        )
      );
    }
  }, [consultationsFromPage, setConsultations, status]);
  return null;
};

export default ConsultationsStoreInitializer;
