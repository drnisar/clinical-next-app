"use client";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  consultation_id: string;
  fieldData: object;
}

const ButtonSaveConsultationNotes = ({ fieldData, consultation_id }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (dataForForm: object) =>
      await axios.patch("/api/consultation/" + consultation_id, dataForForm),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["consultation"] }),
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

export default ButtonSaveConsultationNotes;
