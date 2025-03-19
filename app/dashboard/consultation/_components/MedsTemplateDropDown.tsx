"use client";
import { medsTemplates } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

const MedsTemplateDropDown = ({ visit_id }: { visit_id: number }) => {
  const [selectValue, setSelectValue] = useState("");

  const medsTemplateArray = useQuery({
    queryKey: ["medsTemplates"],
    queryFn: async () => {
      const response = await axios.get("/api/medsTemplates");
      const options = response.data.map(
        (item: { templateName: string; medsArrayTemplate: [] }) => ({
          label: item.templateName,
          value: item.medsArrayTemplate,
        })
      );
      return options;
    },
  });

  useEffect(() => {
    console.log("meds Template array ", medsTemplateArray.data);
  }, [medsTemplateArray]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: medsTemplates) =>
      await axios.post("/api/consult_med", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meds"] });
    },
    onError: (error) => console.log("Error adding medications", error),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (object: any) => {
    const selectedTemplate = object.value;

    const data = selectedTemplate.map((item: medsTemplates) => ({
      visit_id,
      ...item,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.map((item: any) => mutation.mutate(item));
    setSelectValue("");

    console.log(data);
  };

  return (
    <Select
      options={medsTemplateArray.data}
      onChange={onChange}
      value={selectValue}
    />
  );
};

export default MedsTemplateDropDown;
