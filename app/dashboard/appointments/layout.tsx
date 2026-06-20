import { getAppointments, getNextTenAppointments } from "@/app/actions/actions";
import LayoutClientComponent from "./_components/LayoutClientComponent";

const AppointmentsPageLayout = async () => {
  const nextTenAppointments = await getNextTenAppointments();
  const allAppointments = await getAppointments();

  return (
    <>
      <LayoutClientComponent
        nextTenAppointments={nextTenAppointments}
        allAppointments={allAppointments}
      />
    </>
  );
};

export default AppointmentsPageLayout;
