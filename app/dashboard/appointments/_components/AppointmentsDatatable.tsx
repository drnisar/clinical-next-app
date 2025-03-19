"use client";

import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { Appointment } from "@prisma/client";
import styles from "./AppointmentsDatatable.module.css";

interface Props {
  appointments: Appointment[];
}

const AppointmentsDatatable = ({ appointments }: Props) => {
  DataTable.use(DT);

  const columns = [
    {
      data: "date_appointment",
      render: (data: Date) => new Date(data).toLocaleDateString(),
      className: styles.dateColumn,
    },
    { data: "type", className: styles.stringColumn },
    { data: "plan" },
    { data: "notes" },
    { data: "status" },
    // { data: "registration_id" },
    // { data: "appointment_id" },
  ];

  return (
    <DataTable
      data={appointments}
      columns={columns}
      options={{
        order: [[0, "desc"]],
      }}
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Plan</th>
          <th>Notes</th>
          <th>Status</th>
          {/* <th>reg id</th>
          <th>appt id</th> */}
        </tr>
      </thead>
    </DataTable>
  );
};

export default AppointmentsDatatable;
