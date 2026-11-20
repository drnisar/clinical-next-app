import { getRegistrationById } from "@/app/actions/actions";
import { dashboardCallbackUrl } from "@/lib/callbackUrl";
import { isObjectId } from "@/lib/objectId";
import CreateAppointmentComponent from "../_components/CreateAppointmentComponent";

/**
 * Where to go after booking: `returnTo` when it's a dashboard page (checked,
 * so it can't send the user off-site), otherwise the patient's page.
 */
const returnPath = (returnTo: string | undefined, registrationId: string) => {
  const patientPage = `/dashboard/registration/${registrationId}`;
  if (!returnTo) return patientPage;
  // Only paths are expected; the origin just lets the URL parse.
  return dashboardCallbackUrl(returnTo, "http://localhost");
};

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    registration_id?: string;
    returnTo?: string;
  }>;
}) => {
  const { registration_id, type = "", returnTo } = await searchParams;
  if (!registration_id || !isObjectId(registration_id)) {
    return <div>Registration not found</div>;
  }

  const registration = await getRegistrationById(registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <CreateAppointmentComponent
      registration={registration}
      defaultType={type}
      returnTo={returnPath(returnTo, registration_id)}
    />
  );
};

export default NewAppointmentPage;
