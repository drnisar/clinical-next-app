import {
  getAppointments,
  getConsultationById,
  getMedsTemplates,
  getRegistrationById,
  getTodaysConsultations,
} from "@/app/actions/actions";
import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";
import ConsultationDetailsForSingleRegId from "../../_components/ConsultationDetailsForSingleRegId";
import ConsultationTabs from "../../_components/ConsultationTabs";
import MedsDisplayEnglish from "@/app/dashboard/_components/MedsDisplayEnglish";
import InstructionsDisplayEnglish from "@/app/dashboard/_components/InstructionsDisplayEnglish";
import AppointmentsTableForSingleRegId from "@/app/dashboard/appointments/_components/AppointmentsTableForSingleRegId";
import StatusChangeComponent from "../../_components/StatusChangeComponent";
import TodaysPatientsSideBar from "../../_components/TodaysPatientsSideBar";
import { Box, Flex, Grid } from "@radix-ui/themes";

const ConsultationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) => {
  const { id } = await params;
  const { type } = await searchParams;

  const consultation = await getConsultationById(id);
  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  const registration = await getRegistrationById(consultation?.registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  const templates = await getMedsTemplates();
  if (!templates) {
    return <div>No medication templates found</div>;
  }

  const appointments = await getAppointments();
  if (!appointments) {
    return <div>No appointments found</div>;
  }
  const appointmentsForRegistration = await appointments.filter(
    (appointment) =>
      appointment.registration_id === consultation.registration_id
  );
  const patients = await getTodaysConsultations();

  return (
    <>
      <Grid columns="12" gap="2">
        <Box className="pt-4 col-span-2">
          <TodaysPatientsSideBar
            patients={patients.map((patient) => ({
              ...patient,
              ...(patient.registration ?? {}),
            }))}
          />
        </Box>

        <Box className="col-span-10">
          <Flex direction="column" gap="4" p="4" gridColumn={"2"}>
            <Flex justify="between">
              <StatusChangeComponent
                status={consultation.status ?? ""}
                consultation_id={id}
              />
              <ButtonPrintPreview consultation_id={id} />
            </Flex>
            <RegistrationDetailsCard
              registration={consultation?.registration}
            />
            <Flex gap={"2"}>
              <Flex className="col-span-6">
                <ConsultationTabs
                  consultation={consultation}
                  type={type || ""}
                  templates={templates}
                  appointments={appointments}
                />
              </Flex>
              <Flex
                direction="column"
                gap="4"
                className="col-span-4 bg-yellow-50 dark:bg-transparent w-full p-2"
              >
                <ConsultationDetailsForSingleRegId
                  consultation={consultation}
                />
                <MedsDisplayEnglish meds={consultation.medications} />
                <InstructionsDisplayEnglish
                  instructions={consultation.instructions}
                />
                <AppointmentsTableForSingleRegId
                  appointmentsForRegistration={appointmentsForRegistration}
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Grid>
    </>
  );
};

export default ConsultationEditPage;
