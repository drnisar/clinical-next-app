import { getAppointments } from "@/app/actions/actions";
import AppointmentsTable from "./_components/AppointmentsTable";

const AppointmentsPage = async () => {
  try {
    const appointments = await getAppointments();
    if (!appointments || appointments.length === 0) {
      return <div>No appointments found</div>;
    }

    return (
      <div>
        <AppointmentsTable appointments={appointments} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments</div>;
  }
};

export default AppointmentsPage;
