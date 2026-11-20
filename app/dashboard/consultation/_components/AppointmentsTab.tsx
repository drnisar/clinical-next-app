"use client";
import CreateAppointmentDialog from "../../appointments/_components/CreateAppointmentDialog";

interface Props {
  registration_id: string;
  consultation_id: string;
  type: string;
}

const AppointmentsTab = ({ registration_id, type }: Props) => (
  <div className="mt-4 flex justify-center">
    <CreateAppointmentDialog registration_id={registration_id} type={type} />
  </div>
);

export default AppointmentsTab;
