"use client";
import { Flex, Text } from "@radix-ui/themes";
// import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  mr_number: string;
}

type PhysicianNote = {
  cliniC_DESC: string;
  notes: string;
};

export async function fetchPatientPhysicianNotes(mrn: string) {
  // Normalize MRN the same way the component does (remove the 4th char)
  const mrnPrefix = mrn.substring(0, 3);
  const mrnSuffix = mrn.substring(4, mrn.length);
  const newMRN = `${mrnPrefix}${mrnSuffix}`;
  // const url = `http://182.188.28.220:3004/api/Surgery/patient-physician-notes?mrno=${newMRN}`;
  // try {
  //   const res = await axios.get(url);
  //   return res.data;
  // } catch (error) {
  //   console.error("Error fetching patient physician notes:", error);
  //   return "Error fetching physician notes.";
  // }

  try {
    const res = await fetch(`/api/notes?mrno=${newMRN}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient physician notes:", error);
    return "Error fetching physician notes.";
  }
}

function PhysicianNote({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

  return (
    <Flex direction="column" gap="4">
      {paragraphs.map((paragraph, index) => (
        <Text key={index} as="p">
          {paragraph}
        </Text>
      ))}
    </Flex>
  );
}

const HMISNotes = ({ mr_number }: Props) => {
  const [physicianNotesFromHMIS, setPhysicianNotesFromHMIS] = useState<
    PhysicianNote[]
  >([]);

  useEffect(() => {
    // Fetch physician notes when the component mounts
    fetchPatientPhysicianNotes(mr_number).then((notes) => {
      console.log("Patient Physician Notes:", notes);
      setPhysicianNotesFromHMIS(notes);
    });
  }, [mr_number]);

  const specificNoteFromIBPClinic = physicianNotesFromHMIS.find(
    (note: PhysicianNote) => note.cliniC_DESC === "IBP NISAR AHMAD",
  );

  return (
    // <PhysicianNote
    //   text={
    //     specificNoteFromIBPClinic?.notes ??
    //     "No physician notes available from HMIS."
    //   }
    // />
    <div style={{ whiteSpace: "pre-wrap" }}>
      {specificNoteFromIBPClinic?.notes ??
        "No physician notes available from HMIS."}
    </div>
  );
};

export default HMISNotes;
