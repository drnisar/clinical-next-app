"use client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { Registration } from "@/generated/prisma";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import AppointmentForm from "./AppointmentForm";

interface Props {
  registration: Registration;
  defaultType: string;
}

const CreateAppointmentComponent = ({ registration, defaultType }: Props) => (
  <Flex direction="column" gap="4" className="max-w-3xl">
    <Heading size="5">New appointment</Heading>
    <RegistrationDetailsCard registration={registration} />
    <Card size="2">
      <AppointmentForm
        registration_id={registration.registration_id}
        defaultType={defaultType}
      />
    </Card>
  </Flex>
);

export default CreateAppointmentComponent;
