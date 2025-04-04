"use client";
import { Tabs } from "@radix-ui/themes";
import React from "react";
import DischargeForm from "./DischargeForm";
import { Admission_Discharge } from "@prisma/client";
interface Props {
  admission: Admission_Discharge;
}

const DischargeTabs = ({ admission }: Props) => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="Status">Status</Tabs.Trigger>
        <Tabs.Trigger value="Hospital Stay Summary">
          {" "}
          Hospital Stay Summary
        </Tabs.Trigger>
        <Tabs.Trigger value="Investigations Done in Hospital">
          {" "}
          Investigations Done in Hospital
        </Tabs.Trigger>
        <Tabs.Trigger value="Diagnostic Procedures">
          {" "}
          Diagnostic Procedures
        </Tabs.Trigger>
        <Tabs.Trigger value="Therapeutic Procedures">
          {" "}
          Therapeutic Procedures
        </Tabs.Trigger>
        <Tabs.Trigger value="Medications"> Medications</Tabs.Trigger>
        <Tabs.Trigger value="Instructions"> Instructions</Tabs.Trigger>
        <Tabs.Trigger value="Medical Rest"> Medical Rest</Tabs.Trigger>
        <Tabs.Trigger value="Follow up Appointment">
          {" "}
          Follow up Appointment
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Status">
        <DischargeForm admission={admission} />
      </Tabs.Content>
      <Tabs.Content value="Hospital Stay Summary">
        <div>Hospital Stay Summary</div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default DischargeTabs;
