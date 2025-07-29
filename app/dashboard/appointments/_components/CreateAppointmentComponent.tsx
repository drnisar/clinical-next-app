"use client";
import { Heading, Flex } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import AppointmentForm from "./AppointmentForm";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import { useRouter } from "next/navigation";
import { Registration, Appointment } from "@/generated/prisma";

interface Props {
  registration: Registration;
  appointments: ({ registration: Registration } & Appointment)[];
  searchParams: { type: string };
}
const CreateAppointmentComponent = ({
  registration,
  appointments,
  searchParams,
}: Props) => {
  const router = useRouter();
  return (
    <div>
      <Heading size="4">Create Appointment</Heading>
      <Flex gap="4" direction={"column"}>
        <RegistrationDetailsCard registration={registration} />
        <AppointmentForm
          registration_id={registration.registration_id}
          successFn={() => router.refresh()}
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
