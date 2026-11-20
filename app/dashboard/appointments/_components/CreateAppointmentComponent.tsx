"use client";
import { Heading, Flex } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import AppointmentForm from "./AppointmentForm";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import { Registration } from "@/generated/prisma";
import type { BookingAppointment } from "@/app/actions/actions";

interface Props {
  registration: Registration;
  appointments: BookingAppointment[];
  searchParams: { type: string };
}
const CreateAppointmentComponent = ({
  registration,
  appointments,
  searchParams,
}: Props) => {
  return (
    <div>
      <Heading size="4">Create Appointment</Heading>
      <Flex gap="4" direction={"column"}>
        <RegistrationDetailsCard registration={registration} />
        <AppointmentForm
          registration_id={registration.registration_id}
          successFn={() => {}}
        />
        <RecentAppointmentsTable
          appointments={appointments}
          searchParams={searchParams}
        />
      </Flex>
    </div>
  );
};

export default CreateAppointmentComponent;
