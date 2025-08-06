import { Appointment } from "@/generated/prisma";
import { Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  appointment: Appointment;
}

const AppointmentComponent = ({ appointment }: Props) => {
  return (
    <div className="border border-r-2 p-2">
      <Heading size="3" className="mb-2">
        Appointment For{" "}
        {appointment.type === "SEHAT CARD" || appointment.type === "REGULAR"
          ? "Admission"
          : "Consultation"}
      </Heading>
      <div className="grid grid-cols-5  ml-4">
        <div className="col-span-1">
          <Heading size="2">Type</Heading>
        </div>
        <div className="col-span-4">
          <p>{appointment.type}</p>
        </div>
        <div className="col-span-1">
          <Heading size="2">Plan</Heading>
        </div>
        <div className="col-span-4">
          <p>{appointment.plan}</p>
        </div>
        <div className="col-span-1">
          <Heading size="2">Date</Heading>
        </div>
        <div className="col-span-4">
          <p>{appointment.date_appointment.toDateString()}</p>
        </div>
        <div className="col-span-5">
          {appointment.type === "SEHAT CARD" ||
          appointment.type === "REGULAR" ? (
            <p className="rtl">
              {" "}
              مذکورہ تاریخ کو صبح ۱۰ بجے سرجیکل ڈی وارڈ داخلہ کیلئے تشریف لائیں
            </p>
          ) : (
            "Consultation"
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentComponent;
