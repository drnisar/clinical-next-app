"use client";
import { Consultation, Registration } from "@/generated/prisma";
import { TextField } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { colorForStatus } from "../../_components/appConstants";
import { calculateAgeFromDate } from "../today/_components/TodaysConsultationsTable";

interface Props {
  patients: (Registration & Consultation)[];
  id?: string;
}

const TodaysPatientsSideBar = ({ patients, id }: Props) => {
  const [search, setSearch] = useState("");

  // Use useMemo to avoid mutating props and improve performance
  const filteredAndSortedPatients = useMemo(() => {
    if (!patients || patients.length === 0) return [];

    return patients
      .filter((patient) => {
        // Safely check if first_name exists
        const firstName = patient?.first_name;
        if (!firstName) return false;

        const lastName = patient?.last_name || "";
        const searchLower = search.toLowerCase();
        return (
          firstName.toLowerCase().includes(searchLower) ||
          lastName.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === "QUEUED") return -1;
        if (a.status === "IN_PROGRESS" && b.status === "COMPLETED") return -1;
        return 1;
      });
  }, [patients, search]);

  return (
    <div className="pr-2 border-r border-slate-300 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Today Patients</h2>
      <TextField.Root
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="1"
        placeholder="Search patients..."
        className="mb-2 w-full"
      />

      <ul className="space-y-1">
        {filteredAndSortedPatients.map((patient, index) => (
          <li
            key={patient.registration_id || patient.consultation_id}
            className={`
              ${colorForStatus(patient.status)}
              ${
                patient.consultation_id === id
                  ? "!text-slate-50 bg-slate-600 font-extrabold"
                  : "hover:bg-slate-100"
              }
              px-2 py-1 border-b border-slate-300 rounded-sm text-xs transition-colors duration-200
            `}
          >
            <Link
              href={`/dashboard/consultation/edit/${patient.consultation_id}`}
              className="block w-full h-full"
            >
              {index + 1}. {patient.first_name?.toUpperCase() || "Unknown"}{" "}
              {patient.last_name?.toUpperCase() || ""} -{" "}
              {patient.date_of_birth &&
                calculateAgeFromDate(patient.date_of_birth)}
              {patient.gender === "male" ? " (M)" : " (F)"}
            </Link>
          </li>
        ))}

        {filteredAndSortedPatients.length === 0 && (
          <li className="px-2 py-4 text-center text-gray-500 text-sm">
            {search
              ? "No patients found matching your search"
              : "No patients for today"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodaysPatientsSideBar;
