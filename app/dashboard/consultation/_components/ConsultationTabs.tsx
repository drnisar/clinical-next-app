"use client";
import { Clinic_Visit } from "@prisma/client";
import { Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Diagnosis,
  Examination,
  History,
  Investigations,
} from "./ConsultationNotes";

const ConsultationTabs = ({ visit_id }: { visit_id: number }) => {
  const { data: consultation } = useQuery<Clinic_Visit>({
    queryKey: ["consultation"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/consultation/" + visit_id.toString()
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  if (!consultation) return <div>No consultation Found</div>;
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
            visit_id={consultation.visit_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="examination">
          <Examination
            defaultValue={consultation.examination || ""}
            visit_id={consultation.visit_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="investigations">
          <Investigations
            defaultValue={consultation.investigations || ""}
            visit_id={consultation.visit_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="diagnosis">
          <Diagnosis
            defaultValue={consultation.diagnosis || ""}
            visit_id={consultation.visit_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default ConsultationTabs;
