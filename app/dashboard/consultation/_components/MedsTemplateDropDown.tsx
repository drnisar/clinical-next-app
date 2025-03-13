"use client";
import Select from "react-select";
import React, { useRef, useState } from "react";
import { medsTemplates } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface TemplatesArrayProps {
  medsArrayTemplate: medsTemplates[];
}

const MedsTemplateDropDown = ({ visit_id }: { visit_id: number }) => {
  const [selectValue, setSelectValue] = useState("");
  const medsTemplateArray = useQuery({
    queryKey: ["medsTemplates"],
    queryFn: async () => {
      const response = await fetch("/api/medsTemplates");
      return response.json();
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: medsTemplates) =>
      await axios.post("/api/consult_med", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meds"] });
    },
    onError: (error) => console.log("Error adding medications", error),
  });
  const options = medsTemplateArray.data?.map(
    (item: { templateName: string; medsArrayTemplate: [] }) => ({
      label: item.templateName,
      value: item.medsArrayTemplate,
    })
  );

  const onChange = (object: { label: string; value: [] }) => {
    const selectedTemplate = object.value;

    const data = selectedTemplate.map((item: {}) => ({ visit_id, ...item }));

    data.map((item) => mutation.mutate(item));
    setSelectValue("");

    console.log(data);
  };

  return <Select options={options} onChange={onChange} value={selectValue} />;
};

export default MedsTemplateDropDown;
