import {
  getAppointmentsForRegistration,
  getConsultationById,
  getConsultationHistory,
  getMedsTemplates,
} from "@/app/actions/actions";
import { startOfTodayPKT } from "@/lib/dates";
import ConsultationSteps from "../../_components/edit/ConsultationSteps";
import ConsultationSummary from "../../_components/edit/ConsultationSummary";
import ConsultationWorkspace from "../../_components/edit/ConsultationWorkspace";
import PatientHistoryPanel from "../../_components/edit/PatientHistoryPanel";

const ConsultationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) => {
  const { id } = await params;
  const { type } = await searchParams;

  const consultation = await getConsultationById(id);
  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  const registration = consultation.registration;
  if (!registration) {
    return <div>Registration not found</div>;
  }

  // Everything else in parallel. Only this patient's appointments; the
  // booking dialog loads other patients' bookings itself when opened.
  const [templates, patientAppointments, earlierVisits] = await Promise.all([
    getMedsTemplates().catch(() => []),
    getAppointmentsForRegistration(consultation.registration_id),
    getConsultationHistory(consultation.registration_id, id),
  ]);

  const today = startOfTodayPKT();
  const upcomingAppointments = patientAppointments
    .filter((a) => new Date(a.date_appointment) >= today)
    .sort(
      (a, b) =>
        new Date(a.date_appointment).getTime() -
        new Date(b.date_appointment).getTime(),
    );

  return (
    // Keyed by consultation: moving to another patient (e.g. "Next patient")
    // must never reuse the previous patient's editor or panel state.
    <ConsultationWorkspace
      key={id}
      consultationId={id}
      status={consultation.status ?? ""}
      patient={{
        first_name: registration.first_name,
        last_name: registration.last_name,
        gender: registration.gender,
        mr_number: registration.mr_number,
        date_of_birth: registration.date_of_birth,
      }}
      form={
        <ConsultationSteps
          consultation={consultation}
          templates={templates ?? []}
          type={type ?? ""}
          hasUpcomingAppointment={upcomingAppointments.length > 0}
        />
      }
      summary={
        <ConsultationSummary
          consultation={consultation}
          upcomingAppointments={upcomingAppointments}
        />
      }
      history={
        <PatientHistoryPanel
          mrn={registration.mr_number}
          nextAppointment={upcomingAppointments[0] ?? null}
          earlierVisits={earlierVisits}
        />
      }
    />
  );
};

export default ConsultationEditPage;
