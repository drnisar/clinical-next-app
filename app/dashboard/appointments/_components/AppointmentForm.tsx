"use client";
import { appointmentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  SegmentedControl,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { appointmentTypeOptions } from "../../_components/appConstants";
import AppointmentDayPicker from "./AppointmentDayPicker";
import { useRefreshUpcomingAppointments } from "./useUpcomingAppointments";
import { useAppointmentToasts } from "./useAppointmentToasts";

type FormData = z.infer<typeof appointmentSchema>;

const longDate = (ymd: string) =>
  new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <Flex direction="column" gap="1">
    <Text as="label" size="2" weight="bold">
      {label}
    </Text>
    {children}
    {error && (
      <Text size="1" color="red">
        {error}
      </Text>
    )}
  </Flex>
);

interface Props {
  registration_id: string;
  /** Pre-selected appointment type, e.g. from ?type=. */
  defaultType?: string;
  /** Shown in the confirmation toast. */
  patientName?: string;
  /** Called after a successful booking (e.g. to close a dialog or go back). */
  onSuccess?: () => void;
}

const AppointmentForm = ({
  registration_id,
  defaultType,
  patientName,
  onSuccess,
}: Props) => {
  const router = useRouter();
  const refreshUpcoming = useRefreshUpcomingAppointments();
  const { bookedToast } = useAppointmentToasts();
  const validDefault = appointmentTypeOptions.some((o) => o.value === defaultType)
    ? defaultType
    : appointmentTypeOptions[0].value;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      registration_id,
      type: validDefault,
      date_appointment: "",
      plan: "",
      notes: "",
    },
  });
  const date = watch("date_appointment");

  const addMutation = useMutation({
    mutationFn: (data: FormData) =>
      axios.post<{ appointment_id: string; date_appointment: string }>(
        "/api/appointment",
        data,
      ),
    onSuccess: (res, data) => {
      bookedToast(res.data, patientName);
      reset({ ...data, date_appointment: "", plan: "", notes: "" });
      refreshUpcoming();
      router.refresh();
      onSuccess?.();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => addMutation.mutate(data))}
    >
      <Flex direction="column" gap="4">
        <Field label="Type" error={errors.type?.message}>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <SegmentedControl.Root
                value={field.value}
                onValueChange={field.onChange}
                style={{ alignSelf: "flex-start" }}
              >
                {appointmentTypeOptions.map((o) => (
                  <SegmentedControl.Item key={o.value} value={o.value}>
                    {o.label}
                  </SegmentedControl.Item>
                ))}
              </SegmentedControl.Root>
            )}
          />
        </Field>

        <Field
          label="Date — pick a day with room"
          error={errors.date_appointment?.message}
        >
          <Controller
            control={control}
            name="date_appointment"
            render={({ field }) => (
              <AppointmentDayPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>

        <Field label="Plan" error={errors.plan?.message}>
          <TextField.Root
            placeholder="e.g. Post-op review, dressing, stitch removal"
            maxLength={255}
            {...register("plan")}
          />
        </Field>

        <Field label="Notes (optional)" error={errors.notes?.message}>
          <TextArea rows={2} placeholder="Anything to remember" {...register("notes")} />
        </Field>

        {addMutation.isError && (
          <Text size="2" color="red">
            Could not book the appointment. Please try again.
          </Text>
        )}

        <Flex justify="end">
          <Button type="submit" size="3" disabled={addMutation.isPending}>
            {addMutation.isPending
              ? "Booking…"
              : date
                ? `Book for ${longDate(date)}`
                : "Book appointment"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AppointmentForm;
