"use client";
import { OT } from "@/generated/prisma";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputGeneric } from "../../_components/FormComponents";
import { useRouter } from "next/navigation";

type OTNotes = OT;
interface Props {
  ot: OT;
}

const OTNotesForm = ({ ot }: Props) => {
  // const {
  //   data: initialData,
  //   isLoading: isLoadingData,
  //   isError: isFetchError,
  // } = useQuery({
  //   queryKey: ["ot", ot.ot_id],
  //   queryFn: async () => {
  //     try {
  //       const response = await axios.get(`/api/ot/${ot.ot_id}`);
  //       console.log("Fetched OT Notes successfully", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching OT Notes", error);
  //       throw error;
  //     }
  //   },
  //   enabled: !!ot.ot_id,
  // });

  // const queryClient = useQueryClient();
  const router = useRouter();

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
      router.refresh(); // Refresh the page to reflect changes
    },
    onError: (error) => {
      console.error("Error finalizing OT Notes", error);
      toast.error("Error finalizing OT Notes");
    },
  });

  useEffect(() => {
    if (ot) {
      // Format data before resetting
      const formattedData = {
        ...ot,
        // Keep surgery_date as Date or null for react-hook-form type compatibility
        surgery_date: ot.surgery_date ? new Date(ot.surgery_date) : null,
        // Ensure null values become empty strings if needed by inputs
        surgeon: ot.surgeon ?? "",
        assistant_1: ot.assistant_1 ?? "",
        assistant_2: ot.assistant_2 ?? "",
        assistant_3: ot.assistant_3 ?? "",
        anaesthesia: ot.anaesthesia ?? "",
        anaesthetist: ot.anaesthetist ?? "",
        findings: ot.findings ?? "",
        operative_details: ot.operative_details ?? "",
        closure: ot.closure ?? "",
        postop_instructions: ot.postop_instructions ?? "",
      };
      reset(formattedData); // <-- Reset the form with fetched data
    }
  }, [ot, reset]);

  const onSubmit = (data: OTNotes) => {
    const payLoad = { ...data, ot_id: ot.ot_id, admission_id: ot.admission_id };
    console.log("Payload", payLoad);
    mutation.mutate(payLoad);
  };

  const onFinalize = (data: OTNotes) => {
    const payLoad = {
      ...data,
      ot_id: ot.ot_id,
      admission_id: ot.admission_id,
      finalize: 1,
    };
    console.log("Payload", payLoad);
    finalizeMutation.mutate(payLoad);
  };

  const finalizeButtonText = () => {
    if (mutation.isPending) return "Finalizing";
    else if (ot.finalize === 1) return "Finalized";
    else return "Finalize";
  };

  return (
    <>
      <Flex>
        <Flex className=" p-4 border-2 w-full">
          <form className="w-full">
            <fieldset disabled={ot.finalize === 1}>
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
            disabled={mutation.isPending || ot.finalize === 1}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="soft"
            className="w-full mt-4"
            onClick={handleSubmit(onFinalize)}
            disabled={mutation.isPending || ot.finalize === 1}
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
