import { Card, Flex } from "@radix-ui/themes";
import React from "react";
import { WhatsappMessageConfirmAppointment } from "../appConstants";
import CallIcon from "@/public/call.png";
import Link from "next/link";
// import MessageIcon from "@/public/";

interface Props {
  phoneNumber: string;
  appointmentDateEnglish?: string;
  appointmentDateUrdu?: string;
  patient: string;
}

const ContactCard = ({
  phoneNumber,
  appointmentDateEnglish,
  appointmentDateUrdu,
  patient,
}: Props) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800 max-w-screen-sm">
      <p>Phone: {phoneNumber}</p>
      <Flex direction="column" gap="2">
        <Link
          className="text-blue-600 font-bold"
          href={`tel:${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CallIcon && <span> Call</span>}
        </Link>
        <Link
          className="text-blue-600 font-bold"
          href={`sms:${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span> Message</span>
        </Link>

        <Link
          className="text-green-600 font-bold uppercase"
          href={`https://wa.me/${phoneNumber}?text=${WhatsappMessageConfirmAppointment(appointmentDateEnglish || "", appointmentDateUrdu || "", patient || "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span> WhatsApp predefined message</span>
        </Link>
      </Flex>
    </Card>
  );
};

export default ContactCard;
