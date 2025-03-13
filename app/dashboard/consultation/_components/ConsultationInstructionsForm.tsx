"use client";
import { consultationSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clinic_Visit } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface Props {
  consultation?: Clinic_Visit;
  registration_id: number;
}
interface FormData {
  registration_id: number;
  instructions: string;
}

const ConsultationInstructionsForm = ({
  consultation,
  registration_id,
}: Props) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(consultationSchema),
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.post("/api/consultation", data),
    onMutate: async (data: FormData) => {
      console.log("onMutate", data);
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: (response) => {
      const visit_id = response.data.visit_id;
      router.push(`/dashboard/consultation/edit/${visit_id}`);
      router.refresh();
      queryClient.invalidateQueries();
    },
  });

  const editMutation = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.patch(`/api/consultation/${consultation?.visit_id}`, data),
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = (data: FormData) => {
    if (!consultation) {
      addMutation.mutate(data);
    } else {
      editMutation.mutate(data);
    }
  };
  useEffect(() => {
    console.log(consultation);
  }, [consultation]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          type="number"
          defaultValue={registration_id}
          {...register("registration_id", { valueAsNumber: true })}
          className="invisible"
          size="1"
        />

        <Controller
          name="instructions"
          control={control}
          defaultValue={consultation?.instructions || ""}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Write Instructions"
              {...field}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />

        <Button variant="soft" color="purple" type="submit">
          Save
        </Button>
      </form>
    </>
  );
};

export default ConsultationInstructionsForm;
