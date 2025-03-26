"use client";
import { Appointment } from "@prisma/client";
import { Flex, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AppointmentDetailsForVisitid from "./_appointments/AppointmentDetailsForVisitid";
import AppointmentForm from "./_appointments/AppointmentForm";
import AppointmentsTable from "./_appointments/AppointmentsTable";
import ButtonDeleteAppointment from "./_appointments/ButtonDeleteAppointment";

interface Props {
  registration_id: number;
  visit_id: number;
  type: string;
}

const AppointmentsTab = ({ registration_id, visit_id, type }: Props) => {
  const { data: appointment, isLoading } = useQuery<Appointment>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const response = await axios.get("/api/appointment/visit_id/" + visit_id);
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
          <ButtonDeleteAppointment visit_id={visit_id} />
        </>
      )}

      {!appointment && (
        <Flex justify="between">
          <Flex>
            <AppointmentForm
              registration_id={registration_id}
              visit_id={visit_id}
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
