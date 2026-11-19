"use client";
import type { BookingAppointment } from "@/app/actions/actions";
import CreateAppointmentDialog from "../../appointments/_components/CreateAppointmentDialog";

interface Props {
  registration_id: string;
  consultation_id: string;
  type: string;
  appointments: BookingAppointment[];
}

const AppointmentsTab = ({ registration_id, type, appointments }: Props) => {
  return (
    <>
      <div className="mt-4 flex justify-center">
        <CreateAppointmentDialog
          appointments={appointments}
          searchParams={{ type }}
          registration_id={registration_id}
          type={type}
        />
      </div>
    </>
  );
};

export default AppointmentsTab;
