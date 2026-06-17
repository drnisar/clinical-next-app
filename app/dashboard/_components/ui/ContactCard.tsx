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
}

const ContactCard = ({
  phoneNumber,
  appointmentDateEnglish,
  appointmentDateUrdu,
}: Props) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800 max-w-screen-sm">
      <p>Phone: {phoneNumber}</p>
      <Flex direction="column" gap="2">
        <Link
          href={`tel:${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CallIcon && <span> Call</span>}
        </Link>
        <Link
          href={`sms:${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span> Message</span>
        </Link>

        <Link
          href={`https://wa.me/${phoneNumber}?text=${WhatsappMessageConfirmAppointment(appointmentDateEnglish || "", appointmentDateUrdu || "")}`}
        >
          <span> WhatsApp predefined message</span>
        </Link>
      </Flex>
    </Card>
  );
};

export default ContactCard;
