import { Appointment } from "@/generated/prisma";
import { DataList, Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  appointment: Appointment;
}

const AppointmentCard = ({
  appointment: { type, date_appointment, plan },
}: Props) => {
  return (
    <DataList.Root className="p-5 border border-gray-600 col-span-2 bg-grass-100">
      <Heading size="2">Appointment</Heading>
      <DataList.Item>
        <DataList.Label>Date</DataList.Label>
        <DataList.Value>
          {new Date(date_appointment).toLocaleDateString("en-gb")}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Type</DataList.Label>
        <DataList.Value>{type}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Plan</DataList.Label>
        <DataList.Value>{plan}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};

export default AppointmentCard;
