import { getRegistrationById } from "@/app/actions/actions";
import { isObjectId } from "@/lib/objectId";
import CreateAppointmentComponent from "../_components/CreateAppointmentComponent";

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; registration_id?: string }>;
}) => {
  const { registration_id, type = "" } = await searchParams;
  if (!registration_id || !isObjectId(registration_id)) {
    return <div>Registration not found</div>;
  }

  const registration = await getRegistrationById(registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <CreateAppointmentComponent registration={registration} defaultType={type} />
  );
};

export default NewAppointmentPage;
