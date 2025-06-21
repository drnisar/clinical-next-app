"use client";
import { Appointment, Registration } from "@/generated/prisma";
import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Props {
  type: string;
}

type appointment = Appointment;
type registration = Registration;

const AppointmentsTable = ({ type }: Props) => {
  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axios.get(`/api/appointment`);
      return response.data;
    },
  });

  const { data: registrations } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const response = await axios.get(`/api/registration`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const filteredAppointments =
    appointments
      ?.filter((appointment: Appointment) => appointment.type === type)
      .sort(
        (
          a: { date_appointment: string | number | Date },
          b: { date_appointment: string | number | Date }
        ) => {
          // Convert strings to Date objects for comparison
          const dateA = new Date(a.date_appointment);
          const dateB = new Date(b.date_appointment);
          // Sort descending (newest first)
          return dateB.getTime() - dateA.getTime();
        }
      ) || [];
  return (
    <Table.Root size="1" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell> */}
          <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredAppointments &&
          filteredAppointments.map((appointment: appointment) => (
            <Table.Row key={appointment.appointment_id}>
              <Table.Cell>
                {registrations &&
                  registrations.find(
                    (i: registration) =>
                      i.registration_id === appointment.registration_id
                  )?.first_name}
              </Table.Cell>
              <Table.Cell>
                {appointment.date_appointment.toString().slice(0, 10)}
              </Table.Cell>
              <Table.Cell>{appointment.plan} </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};

export default AppointmentsTable;
