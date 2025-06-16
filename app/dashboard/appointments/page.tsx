import AppointmentsTable from "./_components/AppointmentsTable";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const AppointmentsPage = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      select: {
        plan: true,
        date_appointment: true,
        appointment_id: true,
        registration_id: true,
        status: true,
        notes: true,
        type: true,
        registration: {
          select: {
            first_name: true,
            last_name: true,
            gender: true,
          },
        },
      },
      orderBy: { date_appointment: "desc" },
    });
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
