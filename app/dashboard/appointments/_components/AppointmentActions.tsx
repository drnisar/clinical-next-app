"use client";
import {
  APPOINTMENT_STATUSES,
  statusColor,
  statusLabel,
} from "@/lib/appointmentStatus";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ymdPKT } from "@/lib/dates";
import AppointmentDayPicker from "./AppointmentDayPicker";
import { useRefreshUpcomingAppointments } from "./useUpcomingAppointments";

interface Props {
  appointment: {
    appointment_id: string;
    status: string;
    date_appointment: Date | string;
    plan: string;
  };
}

const patchAppointment = (id: string, data: Record<string, string>) =>
  axios.patch(`/api/appointment/${id}`, data);

/** Status dropdown and a Reschedule button for one appointment. */
const AppointmentActions = ({ appointment }: Props) => {
  const router = useRouter();
  const refreshUpcoming = useRefreshUpcomingAppointments();
  const [saving, setSaving] = useState(false);

  const changeStatus = async (status: string) => {
    if (status === appointment.status) return;
    setSaving(true);
    try {
      await patchAppointment(appointment.appointment_id, { status });
      refreshUpcoming();
      router.refresh();
    } catch {
      alert("Could not update the appointment status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Flex gap="2" align="center" wrap="wrap">
      <Select.Root
        size="1"
        value={appointment.status}
        onValueChange={changeStatus}
        disabled={saving}
      >
        <Select.Trigger
          variant="soft"
          color={statusColor(appointment.status)}
          aria-label="Appointment status"
        >
          {statusLabel(appointment.status)}
        </Select.Trigger>
        <Select.Content>
          {APPOINTMENT_STATUSES.map((s) => (
            <Select.Item key={s} value={s}>
              {statusLabel(s)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <RescheduleDialog appointment={appointment} />
    </Flex>
  );
};

const RescheduleDialog = ({ appointment }: Props) => {
  const router = useRouter();
  const refreshUpcoming = useRefreshUpcomingAppointments();
  const currentDate = ymdPKT(appointment.date_appointment);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [plan, setPlan] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onOpenChange = (next: boolean) => {
    if (next) {
      setDate(currentDate);
      setPlan(appointment.plan);
      setError("");
    }
    setOpen(next);
  };

  const save = async () => {
    if (!date) return setError("Please choose a date");
    if (date === currentDate && plan === appointment.plan)
      return setError("Pick a different day");
    if (!plan.trim()) return setError("Please write the plan");
    setSaving(true);
    try {
      await patchAppointment(appointment.appointment_id, {
        date_appointment: date,
        ...(plan !== appointment.plan && { plan: plan.trim() }),
      });
      setOpen(false);
      refreshUpcoming();
      router.refresh();
    } catch {
      setError("Could not reschedule the appointment");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button size="1" variant="soft" color="gray">
          <CalendarIcon /> Reschedule
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="720px">
        <Dialog.Title>Reschedule appointment</Dialog.Title>
        <Dialog.Description size="2" color="gray" mb="3">
          Currently booked for{" "}
          {new Date(`${currentDate}T00:00:00Z`).toLocaleDateString("en-GB", {
            timeZone: "UTC",
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          (marked &ldquo;now&rdquo;). Pick a day with room; the status goes
          back to Pending.
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <AppointmentDayPicker
            value={date}
            onChange={setDate}
            excludeId={appointment.appointment_id}
            currentDate={currentDate}
          />
          <label>
            <Text as="div" size="2" weight="medium" mb="1">
              Plan
            </Text>
            <TextField.Root
              value={plan}
              maxLength={255}
              onChange={(e) => setPlan(e.target.value)}
            />
          </label>
          {error && (
            <Text size="2" color="red">
              {error}
            </Text>
          )}
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Reschedule"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AppointmentActions;
