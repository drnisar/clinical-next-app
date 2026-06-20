"use client";
import { Button, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import CurrentWeekAppointments from "../../_components/CurrentWeekAppointments";
import type { Appointment, Registration } from "@/generated/prisma";
import AppointmentsTable from "./AppointmentsTable";

type AppointmentWithRegistration = Appointment & { registration: Registration };

interface Props {
  nextTenAppointments: AppointmentWithRegistration[];
  allAppointments: AppointmentWithRegistration[];
}

const LayoutClientComponent = ({
  nextTenAppointments,
  allAppointments,
}: Props) => {
  const views = [
    {
      id: "currentWeek",
      label: "Upcoming Appointments",
      component: <CurrentWeekAppointments appointments={nextTenAppointments} />,
    },
    {
      id: "allAppointments",
      label: "All Appointments",
      component: <AppointmentsTable appointments={allAppointments} />,
    },
  ] as const;

  const [selectedView, setSelectedView] = useState<
    (typeof views)[number]["id"]
  >(views[0].id);

  const activeView = views.find((view) => view.id === selectedView);

  return (
    <>
      <Flex direction="row" gap="4" my="4">
        {views.map((view) => (
          <Button
            key={view.id}
            size="1"
            variant={selectedView === view.id ? "solid" : "soft"}
            color={selectedView === view.id ? "grass" : "blue"}
            onClick={() => setSelectedView(view.id)}
            className={
              selectedView === view.id ? "font-extrabold" : "font-light"
            }
          >
            {view.label}
          </Button>
        ))}
      </Flex>

      {activeView?.component}
    </>
  );
};

export default LayoutClientComponent;
