"use client";
import { Consultation } from "@/generated/prisma";
import { Spinner, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Diagnosis,
  Examination,
  History,
  Investigations,
  Plan,
} from "./ConsultationNotes";

const ConsultationTabs = ({ consultation_id }: { consultation_id: string }) => {
  const { data: consultation } = useQuery<Consultation>({
    queryKey: ["consultation"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/consultation/" + consultation_id.toString()
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  if (!consultation) return <Spinner />;
  return (
    <>
      <Tabs.Root defaultValue="history">
        <Tabs.List highContrast>
          <Tabs.Trigger value="history">History</Tabs.Trigger>
          <Tabs.Trigger value="examination">Examination</Tabs.Trigger>
          <Tabs.Trigger value="investigations">Investigations</Tabs.Trigger>
          <Tabs.Trigger value="diagnosis">Diagnosis</Tabs.Trigger>
          <Tabs.Trigger value="plan">Plan</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="history">
          <History
            defaultValue={consultation.history || ""}
            consultation_id={consultation.consultation_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="examination">
          <Examination
            defaultValue={consultation.examination || ""}
            consultation_id={consultation.consultation_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="investigations">
          <Investigations
            defaultValue={consultation.investigations || ""}
            consultation_id={consultation.consultation_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="diagnosis">
          <Diagnosis
            defaultValue={consultation.diagnosis || ""}
            consultation_id={consultation.consultation_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="plan">
          <Plan
            defaultValue={consultation.plan || ""}
            consultation_id={consultation.consultation_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default ConsultationTabs;
