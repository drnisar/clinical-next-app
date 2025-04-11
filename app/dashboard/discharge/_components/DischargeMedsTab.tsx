"use client";
import React from "react";
import DischargeMedsForm from "./DischargeMedsForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DischargeMedsTable from "./DischargeMedsTable";

const DischargeMedsTab = ({ admission_id }: { admission_id: number }) => {
  const { data: dischargeMeds } = useQuery({
    queryKey: ["dischargeMeds"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/admission/discharge_meds/" + admission_id
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return (
    <div>
      <DischargeMedsForm admission_id={admission_id} />
      <DischargeMedsTable dischargeMeds={dischargeMeds} />
    </div>
  );
};

export default DischargeMedsTab;
