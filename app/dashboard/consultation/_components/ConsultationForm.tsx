"use client";
import { consultationSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clinic_Visit } from "@prisma/client";
import { Button, Card, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { InputGeneric } from "../../_components/FormComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

type FormData = Clinic_Visit;

interface ConsultationFormProps {
  registration_id: number;
  consultation?: Clinic_Visit;
}
const ConsultationForm = ({
  registration_id,
  consultation,
}: ConsultationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
    <Card className="p-5">
      <RegistrationDetailsCard registration_id={registration_id.toString()} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          type="number"
          defaultValue={registration_id}
          {...register("registration_id", { valueAsNumber: true })}
          className="invisible"
          size="1"
        />

        <InputGeneric
          name="date_visit"
          label="Visit Date"
          errorMessage={errors.visit_date?.message?.toString() || ""}
        >
          <TextField.Root
            type="date"
            {...register("visit_date")}
            defaultValue={
              consultation?.visit_date
                ? new Date(consultation.visit_date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
          />
        </InputGeneric>

        <InputGeneric
          name={"clinical_details"}
          label={"Clinical Details"}
          errorMessage={""}
        >
          <TextArea
            size="2"
            placeholder="Enter Clinical Details ..."
            {...register("clinical_details")}
            defaultValue={consultation?.clinical_details ?? ""}
          />
        </InputGeneric>

        <Button type="submit" className="btn btn-primary" disabled={isLoading}>
          Save
        </Button>
      </form>
    </Card>
  );
};

export default ConsultationForm;
