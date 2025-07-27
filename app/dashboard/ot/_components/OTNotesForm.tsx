"use client";
import { Button, Flex, TextArea, TextField, Callout } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InputGeneric } from "../../_components/FormComponents";
import { useRouter } from "next/navigation";
import AddToOTTemplateDialog from "./AddToOTTemplateDialog";
import TemplateSelectionDialog from "./TemplateSelectionDialog";

type OTNotes = {
  ot_id: string;
  admission_id: string;
  procedure_name: string;
  surgery_date: string;
  surgeon: string;
  assistant_1: string;
  assistant_2: string;
  assistant_3: string;
  anaesthesia: string;
  anaesthetist: string;
  findings: string;
  operative_details: string;
  closure: string;
  postop_instructions: string;
  finalize?: number; // Optional, used for finalization state
};
interface Props {
  ot: OTNotes;
}

interface OTTemplate {
  ot_template_id: string;
  template_name: string;
  procedure: string;
  findings: string;
  operative_details: string;
  closure: string;
  instructions: string;
  created_at: string;
}

// Define mandatory fields for finalization
const MANDATORY_FINALIZE_FIELDS = {
  procedure_name: "Procedure Name",
  surgeon: "Surgeon",
  anaesthesia: "Anaesthesia",
  anaesthetist: "Anaesthetist",
  findings: "Findings",
  operative_details: "Operative Details",
  closure: "Closure",
  postop_instructions: "Post Operative Instructions",
} as const;

const OTNotesForm = ({ ot }: Props) => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    // formState: { errors },
  } = useForm<OTNotes>({
    defaultValues: {
      procedure_name: "",
      surgery_date: "",
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

  // Helper function to format date
  const formatDateForInput = (date: Date | string | null): string => {
    if (!date) return "";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return "";
      return dateObj.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: OTNotes) => await axios.patch("/api/ot", data),
    onSuccess: (data) => {
      console.log("OT Notes updated successfully", data);
      toast.success("OT Notes updated successfully");
      setValidationErrors([]); // Clear any validation errors
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
      setValidationErrors([]); // Clear validation errors
      router.refresh();
    },
    onError: (error) => {
      console.error("Error finalizing OT Notes", error);
      toast.error("Error finalizing OT Notes");
    },
  });

  useEffect(() => {
    if (ot) {
      const formattedData = {
        procedure_name: ot.procedure_name || "",
        surgery_date: formatDateForInput(ot.surgery_date),
        surgeon: ot.surgeon || "",
        assistant_1: ot.assistant_1 || "",
        assistant_2: ot.assistant_2 || "",
        assistant_3: ot.assistant_3 || "",
        anaesthesia: ot.anaesthesia || "",
        anaesthetist: ot.anaesthetist || "",
        findings: ot.findings || "",
        operative_details: ot.operative_details || "",
        closure: ot.closure || "",
        postop_instructions: ot.postop_instructions || "",
      };

      reset(formattedData);
    }
  }, [ot, reset]);

  // Validation function for mandatory fields
  const validateMandatoryFields = (data: OTNotes): string[] => {
    const errors: string[] = [];

    Object.entries(MANDATORY_FINALIZE_FIELDS).forEach(
      ([fieldKey, fieldLabel]) => {
        const value = data[fieldKey as keyof OTNotes];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          errors.push(`${fieldLabel} is required for finalization`);
        }
      }
    );

    return errors;
  };

  const onSubmit = (data: OTNotes) => {
    const payLoad = {
      ...data,
      ot_id: ot.ot_id,
      admission_id: ot.admission_id,
      // Convert string back to Date for API
    };

    console.log("Payload", payLoad);
    setValidationErrors([]);
    mutation.mutate(payLoad);
  };

  const onFinalize = (data: OTNotes) => {
    // Validate mandatory fields before finalizing
    const mandatoryFieldErrors = validateMandatoryFields(data);

    if (mandatoryFieldErrors.length > 0) {
      setValidationErrors(mandatoryFieldErrors);
      toast.error("Please fill all mandatory fields before finalizing");
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to finalize these OT Notes? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    const payLoad = {
      ...data,
      ot_id: ot.ot_id,
      admission_id: ot.admission_id,
      finalize: 1,
    };
    console.log("Finalize Payload", payLoad);
    setValidationErrors([]); // Clear validation errors
    finalizeMutation.mutate(payLoad);
  };

  const finalizeButtonText = () => {
    if (finalizeMutation.isPending) return "Finalizing...";
    else if (ot.finalize === 1) return "Finalized";
    else return "Finalize";
  };

  // Check if all mandatory fields are filled for finalize button state
  const canFinalize = () => {
    const currentData = getValues();
    const errors = validateMandatoryFields(currentData);
    return errors.length === 0;
  };

  // Handle template selection
  const handleTemplateSelect = (template: OTTemplate) => {
    console.log("Template selected:", template);

    setValue("procedure_name", template.procedure || "");
    setValue("findings", template.findings || "");
    setValue("operative_details", template.operative_details || "");
    setValue("closure", template.closure || "");
    setValue("postop_instructions", template.instructions || "");

    const currentValues = getValues();
    console.log("Form values after template load:", currentValues);

    // Clear validation errors when template is loaded
    setValidationErrors([]);

    toast.success(`Template "${template.template_name}" loaded successfully`);
  };

  const otData = watch();

  return (
    <>
      <Flex direction="column">
        {/* Template Selection Button */}
        <Flex className="p-4 border-b">
          <TemplateSelectionDialog onTemplateSelect={handleTemplateSelect} />
        </Flex>

        {/* Validation Errors Display */}
        {validationErrors.length > 0 && (
          <div className="p-4">
            <Callout.Root color="red" size="2">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                <div className="font-semibold mb-2">
                  The following fields are required for finalization:
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </Callout.Text>
            </Callout.Root>
          </div>
        )}

        <Flex className="p-4 w-full">
          <form className="w-full">
            <fieldset disabled={ot.finalize === 1}>
              <Flex gap="4">
                <InputGeneric
                  label="Procedure Name *"
                  name="procedure_name"
                  className="w-3/4"
                  errorMessage={""}
                >
                  <TextField.Root
                    className="w-full"
                    placeholder="Enter Procedure Name"
                    {...register("procedure_name")}
                    style={{
                      borderColor: validationErrors.some((error) =>
                        error.includes("Procedure Name")
                      )
                        ? "red"
                        : undefined,
                    }}
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
                    label="Surgeon *"
                    name="surgeon"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Enter Surgeon Name"
                      {...register("surgeon")}
                      style={{
                        borderColor: validationErrors.some((error) =>
                          error.includes("Surgeon")
                        )
                          ? "red"
                          : undefined,
                      }}
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
                    label="Anaesthesia *"
                    name="anaesthesia"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Anaesthesia"
                      {...register("anaesthesia")}
                      style={{
                        borderColor: validationErrors.some((error) =>
                          error.includes("Anaesthesia")
                        )
                          ? "red"
                          : undefined,
                      }}
                    />
                  </InputGeneric>
                  <InputGeneric
                    label="Anaesthetist *"
                    name="anaesthetist"
                    className="w-full"
                    errorMessage={""}
                  >
                    <TextField.Root
                      className="w-full"
                      placeholder="Anaesthetist"
                      {...register("anaesthetist")}
                      style={{
                        borderColor: validationErrors.some((error) =>
                          error.includes("Anaesthetist")
                        )
                          ? "red"
                          : undefined,
                      }}
                    />
                  </InputGeneric>
                </Flex>
              </Flex>

              <InputGeneric
                label="Findings *"
                name="findings"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full"
                  placeholder="Enter Findings"
                  {...register("findings")}
                  style={{
                    borderColor: validationErrors.some((error) =>
                      error.includes("Findings")
                    )
                      ? "red"
                      : undefined,
                  }}
                />
              </InputGeneric>

              <InputGeneric
                label="Operative Details *"
                name="operative_details"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-20"
                  placeholder="Enter Operative Details"
                  {...register("operative_details")}
                  style={{
                    borderColor: validationErrors.some((error) =>
                      error.includes("Operative Details")
                    )
                      ? "red"
                      : undefined,
                  }}
                />
              </InputGeneric>

              <InputGeneric
                label="Closure *"
                name="closure"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-10"
                  placeholder="Enter Closure Details"
                  {...register("closure")}
                  style={{
                    borderColor: validationErrors.some((error) =>
                      error.includes("Closure")
                    )
                      ? "red"
                      : undefined,
                  }}
                />
              </InputGeneric>

              <InputGeneric
                label="Post Operative Instructions *"
                name="post_op_instructions"
                className="w-full"
                errorMessage={""}
              >
                <TextArea
                  className="w-full min-h-10"
                  placeholder="Enter Post operative instructions"
                  {...register("postop_instructions")}
                  color="crimson"
                  style={{
                    borderColor: validationErrors.some((error) =>
                      error.includes("Post Operative Instructions")
                    )
                      ? "red"
                      : undefined,
                  }}
                />
              </InputGeneric>
            </fieldset>
          </form>
        </Flex>

        <Flex mt="4" gap="2" direction="column" className="w-full">
          <Button
            variant="soft"
            className="w-full mt-4"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending || ot.finalize === 1}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>

          <Button
            variant="solid"
            className="w-full mt-4"
            onClick={handleSubmit(onFinalize)}
            disabled={
              finalizeMutation.isPending || ot.finalize === 1 || !canFinalize()
            }
            color={canFinalize() ? "red" : "gray"}
          >
            {finalizeButtonText()}
          </Button>

          {/* Show helper text for finalize button */}
          {!canFinalize() && ot.finalize !== 1 && (
            <div className="text-center">
              <span className="text-sm text-gray-500">
                * Fill all mandatory fields to enable finalization
              </span>
            </div>
          )}

          <AddToOTTemplateDialog
            procedure={otData.procedure_name || ""}
            findings={otData.findings || ""}
            operative_details={otData.operative_details || ""}
            closure={otData.closure || ""}
            instructions={otData.postop_instructions || ""}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default OTNotesForm;
