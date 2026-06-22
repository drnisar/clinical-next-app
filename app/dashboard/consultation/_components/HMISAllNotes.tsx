"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientPhysicianNotes } from "./HMISNotes";
import { Heading, Separator } from "@radix-ui/themes";
import { parseHMISDate } from "../../_components/appConstants";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPatientPhysicianNotes(mrn).then((notes) => {
      const sortedNotes = [...notes].sort(
        (a, b) =>
          // new Date(b.noteS_DATE).getTime() - new Date(a.noteS_DATE).getTime(),
          parseHMISDate(b.noteS_DATE).getTime() -
          parseHMISDate(a.noteS_DATE).getTime(),
      );
      setLoading(false);
      setAllNotes(sortedNotes);
    });
  }, [mrn]);
  console.log("HMIS all notes", allNotes);

  if (loading) return <div>Loading Notes ...</div>;

  return (
    <>
      {allNotes.length > 0 ? (
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
