"use client";
import { Flex, Box, Switch } from "@radix-ui/themes";
import React, { useState } from "react";
import ButtonEditPage from "../../_components/ButtonEditPage";
import ButtonPrintPage from "../../_components/ButtonPrintPage";
import ConsultantFooter from "../../_components/ConsultantFooter";
import ConsultantHeader from "../../_components/ConsultantHeader";
import SingleConsultationDetails from "../../_components/SingleConsultationDetails";
import {
  Appointment,
  Consultation,
  Medication,
  Registration,
} from "@/generated/prisma";

interface Props {
  registration: Registration;
  id: string;
  meds: Medication[];
  consultation: Consultation;
  appointment?: Appointment;
}

const PageClient = ({
  registration,
  id,
  meds,
  consultation,
  appointment,
}: Props) => {
  const [headerFooterVisible, setHeaderFooterVisible] = useState(true);
  return (
    <>
      <Switch
        checked={headerFooterVisible}
        onCheckedChange={() => setHeaderFooterVisible(!headerFooterVisible)}
        defaultChecked={true}
        className="print:!hidden"
      />
      <main className="print-container ">
        <header>
          <Flex gap="2" justify="end">
            <ButtonEditPage params={id} />
            <ButtonPrintPage />
          </Flex>
          <ConsultantHeader headerFooterVisible={headerFooterVisible} />
        </header>

        <Box className="">
          <SingleConsultationDetails
            registration={registration}
            medications={meds}
            consultation={consultation}
            appointment={appointment || undefined}
          />
        </Box>
      </main>
      <footer className="print:fixed print:bottom-0 print:left-0 print:w-full hidden print:block">
        <ConsultantFooter headerFooterVisible={headerFooterVisible} />
      </footer>
    </>
  );
};

export default PageClient;
