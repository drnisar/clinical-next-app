"use client";
import { ConsultationMedications } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface Props {
  medsArray: ConsultationMedications[];
}

const MedsAddToTemplate = ({ medsArray }: Props) => {
  const addToTemplateMutation = useMutation({
    mutationFn: async (
      data: {
        drug_name: string;
        quantity: number | null;
        drug_form: string | null;
        frequency: string | null;
        route: string | null;
        duration: number | null;
        interval: string | null;
        instructions: string | null;
      }[]
    ) => {
      console.log("Data for mutation", data);
    },
  });

  const addToTemplate = () => {
    const array = medsArray.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ consult_med_id, visit_id, ...modifiedMed }) => modifiedMed
    );
    addToTemplateMutation.mutate(array);
  };
  return <Button onClick={addToTemplate}>Add to Template</Button>;
};

export default MedsAddToTemplate;
