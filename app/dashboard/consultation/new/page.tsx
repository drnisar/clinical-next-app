import React from "react";
import ConsultationForm from "../_components/ConsultationForm";

const NewConsultationPage = async ({
  searchParams,
}: {
  searchParams: { registration_id: number };
}) => {
  const registration_id = searchParams.registration_id;
  return (
    <div>
      <ConsultationForm registration_id={registration_id} />
    </div>
  );
};

export default NewConsultationPage;
