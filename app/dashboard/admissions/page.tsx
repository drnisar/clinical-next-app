import prisma from "@/prisma/client";
import CurrentlyAdmittedList from "./_components/CurrentlyAdmittedList";

// filepath: /Users/nisar/Desktop/workspace/clinical-next-app/app/dashboard/admissions/page.tsx
// ... other imports ...
import { Registration } from "@prisma/client";

// Ensure this type matches the one in CurrentlyAdmittedList
interface AdmissionWithRegistrationForList {
  admission_id: number;
  // ... other Admission_Discharge fields
  registration: Registration | null; // lowercase 'r'
}

const AdmissionsPage = async () => {
  const admissionsFromDb = await prisma.admission_Discharge.findMany({
    where: { status: "ADMITTED" },
    include: { Registration: true }, // Prisma includes with capital 'R'
  });

  if (!admissionsFromDb || admissionsFromDb.length === 0) {
    return <div>No currently admitted patients found.</div>;
  }

  // *** CRITICAL: Ensure this transformation happens correctly ***
  const admissionsForComponent = admissionsFromDb.map((admission) => {
    const { Registration, ...restOfAdmission } = admission;
    // Ensure Registration is not null/undefined before assigning
    return {
      ...restOfAdmission,
      registration: Registration ?? null, // Assign to lowercase 'r', handle null
    };
  });

  // Pass the CORRECTLY TRANSFORMED data
  return <CurrentlyAdmittedList admissions={admissionsForComponent} />;
};
export default AdmissionsPage;
