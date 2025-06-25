import React from "react";
import RegistrationDetailsCard from "../_components/RegistrationDetailsCard";
import AppointmentsForSingleRegId from "../../appointments/_components/AppointmentsForSingleRegId";
import { Box } from "@radix-ui/themes";
import ConsultationsForSingleRegId from "../../consultation/_components/ConsultationsForSingleRegId";
import AdmissionsForSingleRegId from "../../admissions/_components/AdmissionsForSingleRegId";
import SurgicalProceduresForSingleReg from "../../ot/_components/SurgicalProceduresForSingleReg";
import { getRegistrationById } from "@/app/actions/actions";

const RegistrationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const registration = await getRegistrationById(id);

  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <Box className="space-y-5">
      <RegistrationDetailsCard registration={registration} />

      <AppointmentsForSingleRegId
        appointments={registration.Appointment || []}
        registration_id={id}
      />
      <ConsultationsForSingleRegId
        consultations={registration.Consultation || []}
        registration_id={id}
      />

      <AdmissionsForSingleRegId
        admissions={registration.Admission_Discharge || []}
        registration_id={id}
      />
      <SurgicalProceduresForSingleReg registration_id={id} />
      {JSON.stringify(registration, null, 2)}
    </Box>
  );
};

export default RegistrationDetailsPage;
