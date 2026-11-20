"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Registration } from "@/generated/prisma";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import AppointmentForm from "./AppointmentForm";

interface Props {
  registration: Registration;
  defaultType: string;
  /** The page the booking was started from; we go back there afterwards. */
  returnTo: string;
}

const CreateAppointmentComponent = ({
  registration,
  defaultType,
  returnTo,
}: Props) => {
  const router = useRouter();
  return (
    <Flex direction="column" gap="4" className="max-w-3xl">
      <Flex justify="between" align="center" gap="2">
        <Heading size="5">New appointment</Heading>
        <Button variant="ghost" color="gray" asChild>
          <Link href={returnTo}>
            <ArrowLeftIcon /> Back
          </Link>
        </Button>
      </Flex>
      <RegistrationDetailsCard registration={registration} />
      <Card size="2">
        <AppointmentForm
          registration_id={registration.registration_id}
          defaultType={defaultType}
          patientName={`${registration.first_name} ${registration.last_name}`.toUpperCase()}
          onSuccess={() => router.push(returnTo)}
        />
      </Card>
    </Flex>
  );
};

export default CreateAppointmentComponent;
