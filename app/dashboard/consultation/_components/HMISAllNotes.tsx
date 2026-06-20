"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientPhysicianNotes } from "./HMISNotes";
import { Heading, Separator } from "@radix-ui/themes";

type note = {
  notes: string;
  cliniC_DESC: string;
  noteS_DATE: string;
  writeR_USER_NAME: string;
};

interface Props {
  mrn: string;
}

const HMISAllNotes = ({ mrn }: Props) => {
  const [allNotes, setAllNotes] = useState<note[]>([]);

  useEffect(() => {
    fetchPatientPhysicianNotes(mrn).then((notes) => setAllNotes(notes));
  }, [mrn]);
  console.log("HMIS all notes", allNotes);

  return (
    <>
      {allNotes ? (
        allNotes.map((note, index) => (
          <div key={index} style={{ whiteSpace: "pre-wrap" }}>
            <Heading size={"3"}>
              {note.writeR_USER_NAME} - - {note.noteS_DATE}
            </Heading>
            <p>{note.cliniC_DESC}</p>
            <p>{note.notes}</p>
            <Separator my="3" size="4" />
          </div>
        ))
      ) : (
        <p>No notes found</p>
      )}
      {/* <div>{JSON.stringify(allNotes)}</div> */}
    </>
  );
};

export default HMISAllNotes;
