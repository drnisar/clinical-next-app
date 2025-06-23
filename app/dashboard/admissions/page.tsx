import { getAdmissions } from "@/app/actions/actions";
import CurrentlyAdmittedList from "./_components/CurrentlyAdmittedList";

const AdmissionsPage = async () => {
  const admissions = await getAdmissions();
  if (!admissions || admissions.length === 0) {
    return <div>No admissions found</div>;
  }

  return <CurrentlyAdmittedList admissions={admissions} />;
};
export default AdmissionsPage;
