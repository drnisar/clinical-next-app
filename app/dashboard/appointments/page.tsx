import { Suspense } from "react";
import { getAppointments } from "@/app/actions/actions";
import AppointmentsTable from "./_components/AppointmentsTable";

const AppointmentsPage = async () => {
  try {
    const appointments = await getAppointments();
    // The table reads its filters from the URL (useSearchParams).
    return (
      <Suspense>
        <AppointmentsTable appointments={appointments} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments</div>;
  }
};

export default AppointmentsPage;
