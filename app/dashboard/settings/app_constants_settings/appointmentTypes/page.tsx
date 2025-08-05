import { getAppointmentTypes } from "@/app/actions/actions";
import { AppointmentType } from "@/generated/prisma";
import React from "react";

const AppointmentTypesPage = async () => {
  const types: AppointmentType[] = await getAppointmentTypes();

  return (
    <>
      <h1>Appointment Types</h1>
      {/* <ul>
        {types.map((type) => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul> */}
      {JSON.stringify(types, null, 2)}
    </>
  );
};

export default AppointmentTypesPage;
