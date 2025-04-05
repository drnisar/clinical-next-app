"use client";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  admission_id: number;
  fieldData: object;
}

const ButtonSaveDischargeComponents = ({ admission_id, fieldData }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (dataForForm: object) =>
      await axios.patch("/api/admission/" + admission_id, dataForForm),
    //   await console.log(dataForForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
      alert("Saved successfully");
    },

    onError: () => console.log("error"),
  });

  return (
    <Button
      variant="soft"
      color="red"
      onClick={() => {
        mutation.mutate(fieldData);
      }}
      disabled={mutation.isPending}
      className="max-w-[100px]"
    >
      {mutation.isPending ? "Saving..." : "Save"}
    </Button>
  );
};

export default ButtonSaveDischargeComponents;
