"use client";
import { Appointment } from "@/generated/prisma";
import { Flex, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AppointmentDetailsForVisitid from "./_appointments/AppointmentDetailsForVisitid";
import AppointmentForm from "./_appointments/AppointmentForm";
import AppointmentsTable from "./_appointments/AppointmentsTable";
import ButtonDeleteAppointment from "./_appointments/ButtonDeleteAppointment";

interface Props {
  registration_id: string;
  consultation_id: string;
  type: string;
}

const AppointmentsTab = ({ registration_id, consultation_id, type }: Props) => {
  const { data: appointment, isLoading } = useQuery<Appointment>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/appointment/visit_id/" + consultation_id
      );
      return response.data;
    },

    staleTime: 0,
    refetchOnMount: false,
  });
  if (isLoading) return <Spinner />;

  return (
    <>
      {appointment && (
        <>
          <AppointmentDetailsForVisitid appointment={appointment} />
          <ButtonDeleteAppointment consultation_id={consultation_id} />
        </>
      )}

      {!appointment && (
        <Flex justify="between">
          <Flex>
            <AppointmentForm
              registration_id={registration_id}
              consultation_id={consultation_id}
              type={type}
            />
          </Flex>

          <AppointmentsTable type={type} />
        </Flex>
      )}
    </>
  );
};

export default AppointmentsTab;
