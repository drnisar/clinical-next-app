"use client";
import { Appointment } from "@prisma/client";
import { Badge, Button, DataList, Flex } from "@radix-ui/themes";

interface Props {
  appointment: Appointment | null;
}

const AppointmentDetailsForVisitid = ({ appointment }: Props) => {
  if (!appointment) {
    return <div>No appointment found</div>;
  }
  return (
    <Flex direction="column">
      <DataList.Root className="p-5">
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Type</DataList.Label>
          <DataList.Value>
            <Badge color="jade" variant="soft" radius="full">
              {appointment.type}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Date</DataList.Label>
          <DataList.Value>
            {new Date(appointment.date_appointment).toLocaleString("en-gb")}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Plan</DataList.Label>
          <DataList.Value>{appointment.plan}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Status</DataList.Label>
          <DataList.Value>{appointment.status}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Notes</DataList.Label>
          <DataList.Value>{appointment.notes}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <Flex gap="2" p="5">
        <Button
          color="blue"
          variant="soft"
          onClick={() => {
            console.log("Edit appointment", appointment);
          }}
        >
          Edit
        </Button>
      </Flex>
    </Flex>
  );
};

export default AppointmentDetailsForVisitid;
