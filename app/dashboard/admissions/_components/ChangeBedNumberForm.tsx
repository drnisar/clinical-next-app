import { Button, Flex, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Location = { bed_number: number; ward: string; admission_id: string };

interface Props {
  location: Location;
  formVisibility: () => void;
}
const ChangeBedNumberForm = ({ location, formVisibility }: Props) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Location>({
    defaultValues: location,
  });

  const { mutate: submit } = useMutation({
    mutationFn: async (data: Location) =>
      await axios.patch(`/api/admission/${location.admission_id}`, data),
    onSuccess: () => {
      console.log("Bed number updated successfully");
      formVisibility();
      router.refresh();
      toast.success("Bed number updated successfully");
    },
    onError: (error) => {
      console.error("Error updating bed number:", error);
    },
  });

  const onSubmit = (data: Location) => {
    console.log("Form Data:", data);
    // Here you can handle the form submission, e.g., send data to an API
    formVisibility();
    submit(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={"2"}>
        <TextField.Root
          size="1"
          type="number"
          {...register("bed_number", { valueAsNumber: true })}
          placeholder="Bed No"
        />
        <TextField.Root size="1" {...register("ward")} placeholder="Ward" />
        <Button type="submit" variant="soft" color="green" size="1">
          Change Bed Number
        </Button>
      </Flex>
    </form>
  );
};

export default ChangeBedNumberForm;
