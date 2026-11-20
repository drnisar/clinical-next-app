import { getAppointments } from "@/app/actions/actions";
import AppointmentsTable from "./_components/AppointmentsTable";

const AppointmentsPage = async () => {
  try {
    const appointments = await getAppointments();
    return <AppointmentsTable appointments={appointments} />;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments</div>;
  }
};

export default AppointmentsPage;
