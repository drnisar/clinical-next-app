import prisma from "@/prisma/client";
import CurrentlyAdmittedList from "./_components/CurrentlyAdmittedList";

const AdmissionsPage = async () => {
  const admissionsFromDb = await prisma.admission_Discharge.findMany({
    where: { status: "ADMITTED" },
    include: { Registration: true }, // Prisma includes with capital 'R'
  });

  if (!admissionsFromDb || admissionsFromDb.length === 0) {
    return <div>No currently admitted patients found.</div>;
  }

  const admissionsForComponent = admissionsFromDb.map((admission) => {
    const { Registration, ...restOfAdmission } = admission;
    return {
      ...restOfAdmission,
      registration: Registration ?? null, // Assign to lowercase 'r', handle null
    };
  });

  return <CurrentlyAdmittedList admissions={admissionsForComponent} />;
};
export default AdmissionsPage;
