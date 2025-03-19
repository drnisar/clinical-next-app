"use client";
import { consultationSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clinic_Visit } from "@prisma/client";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { InputGeneric } from "../../_components/FormComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
type FormData = Clinic_Visit;

interface ConsultationFormProps {
  registration_id: number;
  consultation?: Clinic_Visit;
}
const ConsultationForm = ({
  registration_id,
  consultation,
}: ConsultationFormProps) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(consultationSchema),
  });
  const router = useRouter();

  const queryClient = useQueryClient();

  const addmutation = useMutation({
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

  const { mutate: editMutate, isPending: editPending } = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.patch(`/api/consultation/${consultation?.visit_id}`, data),
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = async (data: FormData) => {
    if (consultation) {
      editMutate(data);
    } else {
      addmutation.mutate(data);
    }
  };

  const isLoading = addmutation.isPending || editPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex className="p-5">
        <Box minWidth={"xl"}>
          <TextField.Root
            type="number"
            defaultValue={registration_id}
            {...register("registration_id", { valueAsNumber: true })}
            className="invisible"
            size="1"
          />

          <InputGeneric name={"clinical_details"} label={""} errorMessage={""}>
            <Controller
              name="clinical_details"
              control={control}
              defaultValue={
                consultation?.clinical_details ?? "## Clinical Details"
              }
              render={({ field }) => (
                <SimpleMDE
                  placeholder="Enter Clinical Details ..."
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
          </InputGeneric>
        </Box>
        <Box width={"50px"}>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            Save
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default ConsultationForm;
