"use client";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  admission_id: string;
  fieldData: object;
  onSave: () => void;
}

const ButtonSaveDischargeComponents = ({
  admission_id,
  fieldData,
  onSave,
}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (dataForForm: object) =>
      await axios.patch("/api/admission/" + admission_id, dataForForm),
    //   await console.log(dataForForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
      router.refresh();
    },

    onError: () => console.log("error"),
  });

  return (
    <Button
      variant="soft"
      color="red"
      onClick={() => {
        mutation.mutate(fieldData);
        onSave();
      }}
      disabled={mutation.isPending}
      className="max-w-[100px]"
    >
      {mutation.isPending ? "Saving..." : "Save"}
    </Button>
  );
};

export default ButtonSaveDischargeComponents;
