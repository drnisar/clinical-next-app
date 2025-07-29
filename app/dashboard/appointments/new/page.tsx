import { getAppointments, getRegistrationById } from "@/app/actions/actions";
import CreateAppointmentComponent from "../_components/CreateAppointmentComponent";

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: string; registration_id: string }>;
}) => {
  const { registration_id, type } = await searchParams;
  const appointments = await getAppointments();
  const registration = await getRegistrationById(registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <>
      <CreateAppointmentComponent
        registration={registration}
        appointments={appointments}
        searchParams={{ type }}
      />
    </>
  );
};

export default NewAppointmentPage;
