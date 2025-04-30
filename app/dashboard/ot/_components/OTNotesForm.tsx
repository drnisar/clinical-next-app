"use client";

import React, { useEffect } from "react";
import { InputGeneric } from "../../_components/FormComponents";
import {
  Button,
  Callout,
  Flex,
  Spinner,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { ot } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type OTNotes = ot;

const OTNotesForm = ({
  ot_id,
  admission_id,
}: {
  ot_id: number;
  admission_id: number;
}) => {
  const {
    data: initialData,
    isLoading: isLoadingData,
    isError: isFetchError,
  } = useQuery({
    queryKey: ["ot", ot_id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/ot/${ot_id}`);
        console.log("Fetched OT Notes successfully", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching OT Notes", error);
        throw error;
      }
    },
    enabled: !!ot_id,
  });

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<OTNotes>({
    defaultValues: {
      procedure_name: "",
      surgery_date: null,
      surgeon: "",
      assistant_1: "",
      assistant_2: "",
      assistant_3: "",
      anaesthesia: "",
      anaesthetist: "",
      findings: "",
      operative_details: "",
      closure: "",
      postop_instructions: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: OTNotes) => await axios.patch("/api/ot", data),

    onSuccess: (data) => {
      console.log("OT Notes updated successfully", data);
      toast.success("OT Notes updated successfully");
    },
    onError: (error) => {
      console.error("Error updating OT Notes", error);
      toast.error("Error updating OT Notes");
    },
  });

  const finalizeMutation = useMutation({
    mutationFn: async (data: OTNotes) =>
      await axios.patch("/api/ot", {
        ...data,
        finalize: 1,
      }),
    onSuccess: (data) => {
      console.log("OT Notes finalized successfully", data);
      toast.success("OT Notes finalized successfully");
    },
    onError: (error) => {
      console.error("Error finalizing OT Notes", error);
      toast.error("Error finalizing OT Notes");
    },
  });

  useEffect(() => {
    if (initialData) {
      // Format data before resetting
      const formattedData = {
        ...initialData,
        // Format date for input type="date"
        surgery_date: initialData.surgery_date
          ? new Date(initialData.surgery_date).toISOString().split("T")[0]
          : "",
        // Ensure null values become empty strings if needed by inputs
        surgeon: initialData.surgeon ?? "",
        assistant_1: initialData.assistant_1 ?? "",
        assistant_2: initialData.assistant_2 ?? "",
        assistant_3: initialData.assistant_3 ?? "",
        anaesthesia: initialData.anaesthesia ?? "",
        anaesthetist: initialData.anaesthetist ?? "",
        findings: initialData.findings ?? "",
        operative_details: initialData.operative_details ?? "",
        closure: initialData.closure ?? "",
        postop_instructions: initialData.postop_instructions ?? "",
      };
      reset(formattedData); // <-- Reset the form with fetched data
    }
  }, [initialData, reset]);

  const onSubmit = (data: OTNotes) => {
    const payLoad = { ...data, ot_id: ot_id, admission_id: admission_id };
    console.log("Payload", payLoad);
    mutation.mutate(payLoad);
  };

  const onFinalize = (data: OTNotes) => {
    const payLoad = {
      ...data,
      ot_id: ot_id,
      admission_id: admission_id,
      finalize: 1,
    };
    console.log("Payload", payLoad);
    finalizeMutation.mutate(payLoad);
    queryClient.invalidateQueries({ queryKey: ["ot"] });
  };

  if (isLoadingData)
    return (
      <Flex justify="center" align="center" p="5">
        <Spinner size="3" />
      </Flex>
    );
  if (isFetchError)
    return (
      <Callout.Root color="red" m="5">
        <Callout.Text>Error fetching OT Note details.</Callout.Text>
      </Callout.Root>
    );
  const finalizeButtonText = () => {
    if (mutation.isPending) return "Finalizing";
    else if (initialData.finalize === 1) return "Finalized";
    else return "Finalize";
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Flex>
        <Flex className=" p-4 border-2 border-gray-200 bg-slate-50 w-full">
          <form className="w-full">
            <fieldset disabled={initialData.finalize === 1}>
              <Flex gap="4">
                <InputGeneric
                  label="Procedure Name"
                  name="procedure_name"
                  className="w-3/4"
                  errorMessage={""}
                >
                  <TextField.Root
                    className="w-full"
                    placeholder="Enter Procedure Name"
                    {...register("procedure_name")}
                  />
                </InputGeneric>
                <InputGeneric
                  label="Date"
                  name="date"
                  className="w-1/4"
                  errorMessage={""}
                >
                  <TextField.Root
                    type="date"
                    className="w-full"
                    {...register("surgery_date")}
                  />
                </InputGeneric>
              </Flex>
              <Flex gap="4" direction={"column"}>
                <Flex
                  direction="row"
                  className="w-1/2"
                  gap={"4"}
                  width={"100%"}
                >
                  <InputGeneric
                    label="Surgeon"
                    name="surgeon"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Enter Surgeon Name"
                      {...register("surgeon")}
                    />
                  </InputGeneric>
                  <InputGeneric
                    label="Assistant 1"
                    name="assistant_1"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Assistant 1"
                      {...register("assistant_1")}
                    />
                  </InputGeneric>
                  <InputGeneric
                    label="Assistant 2"
                    name="assistant_2"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Assistant 2"
                      {...register("assistant_2")}
                    />
                  </InputGeneric>
                  <InputGeneric
                    label="Assistant 3"
                    name="assistant_3"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Assistant 3"
                      {...register("assistant_3")}
                    />
                  </InputGeneric>
                </Flex>
                <Flex
                  direction="row"
                  className="w-1/2"
                  width={"100%"}
                  gap={"4"}
                >
                  <InputGeneric
                    label="Anaesthesia"
                    name="anaesthesia"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Anaesthesia"
                      {...register("anaesthesia")}
                    />
                  </InputGeneric>
                  <InputGeneric
                    label="Anaesthetist"
                    name="anaesthetist"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Anaesthetist"
                      {...register("anaesthetist")}
                    />
                  </InputGeneric>
                </Flex>
              </Flex>

              <InputGeneric
                label="Findings"
                name="findings"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full"
                  placeholder="Enter Findings"
                  {...register("findings")}
                />
              </InputGeneric>
              <InputGeneric
                label="Operative Details"
                name="operative_details"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-10"
                  placeholder="Enter Operative Details"
                  {...register("operative_details")}
                />
              </InputGeneric>
              <InputGeneric
                label="Closure"
                name="closure"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-10"
                  placeholder="Enter Closure Details"
                  {...register("closure")}
                />
              </InputGeneric>
              <InputGeneric
                label="Post Operative Instructions"
                name="post_op_instructions"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-10"
                  placeholder="Enter Post operative instructions"
                  {...register("postop_instructions")}
                  color="crimson"
                />
              </InputGeneric>
            </fieldset>
          </form>
        </Flex>
        <Flex
          className="w-1/6 p-4 border-2"
          direction="column"
          gap="4"
          style={{ height: "100vh" }}
        >
          <Button
            variant="soft"
            className="w-full mt-4"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending || initialData.finalize === 1}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="soft"
            className="w-full mt-4"
            onClick={handleSubmit(onFinalize)}
            disabled={mutation.isPending || initialData.finalize === 1}
            color="red"
          >
            {finalizeButtonText()}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default OTNotesForm;
