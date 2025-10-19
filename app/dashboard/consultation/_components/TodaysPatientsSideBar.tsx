"use client";
import { Consultation, Registration } from "@/generated/prisma";
import { TextField, Button } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { colorForStatus } from "../../_components/appConstants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { calculateAgeFromDate } from "../today/_components/TodaysConsultationsTable";

type Patient = Consultation & {
  registration: Registration;
};

interface Props {
  id?: string;
}

const TodaysPatientsSideBar = ({ id }: Props) => {
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const patientsFromQuery = useQuery({
    queryKey: ["todaysPatients"],
    queryFn: async () => {
      const response = await axios.get("/api/consultation/today");
      if (response.status !== 200) {
        throw new Error("Failed to fetch today's patients");
      }
      return response.data;
    },
    refetchInterval: 60 * 1000, // Reduced to 60 seconds since we have manual refresh
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
  });

  const filteredAndSortedPatients = useMemo(() => {
    if (!patientsFromQuery.data || patientsFromQuery.data.length === 0)
      return [];

    return patientsFromQuery.data.filter((patient: Patient) => {
      const firstName = patient?.registration?.first_name;
      if (!firstName) return false;

      const lastName = patient?.registration?.last_name || "";
      const searchLower = search.toLowerCase();
      return (
        firstName.toLowerCase().includes(searchLower) ||
        lastName.toLowerCase().includes(searchLower)
      );
    });
  }, [patientsFromQuery.data, search]);

  // Helper function to safely calculate age
  const getAge = (dateOfBirth: string | Date | null | undefined) => {
    if (!dateOfBirth) return null;

    try {
      // Convert string to Date if necessary
      const date =
        typeof dateOfBirth === "string" ? new Date(dateOfBirth) : dateOfBirth;

      // Check if date is valid
      if (isNaN(date.getTime())) return null;

      return calculateAgeFromDate(date);
    } catch (error) {
      console.error("Error calculating age:", error);
      return null;
    }
  };

  // Fast refresh function
  const refreshFunction = async () => {
    setIsRefreshing(true);
    try {
      // Use refetch instead of invalidateQueries for faster response
      await patientsFromQuery.refetch();
    } catch (error) {
      console.error("Failed to refresh patients:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="pr-2 border-r border-slate-300 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Today Patients</h2>
        <Button
          variant="ghost"
          size="1"
          onClick={refreshFunction}
          disabled={isRefreshing}
          className="p-1"
        >
          <ReloadIcon
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      <TextField.Root
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="1"
        placeholder="Search patients..."
        className="mb-2 w-full"
      />

      <ul className="space-y-1">
        {filteredAndSortedPatients.map((patient: Patient, index: number) => (
          <li
            key={patient.registration_id || patient.consultation_id}
            className={`
              ${colorForStatus(patient.status)}
              ${patient.consultation_id === id && " font-extrabold"}
              px-2 py-1 border-b border-slate-300 rounded-sm text-xs transition-colors duration-200 hover:bg-slate-100
            `}
          >
            <Link
              href={`/dashboard/consultation/edit/${patient.consultation_id}`}
              className="block w-full h-full"
            >
              {index + 1}.{" "}
              {patient.registration.first_name?.toUpperCase() || "Unknown"}{" "}
              {patient.registration.last_name?.toUpperCase() || ""} -{" "}
              {patient.registration.date_of_birth &&
                getAge(patient.registration.date_of_birth)}{" "}
              {patient.registration.gender === "male" ? " (M)" : " (F)"}
            </Link>
          </li>
        ))}

        {patientsFromQuery.isLoading && (
          <li className="px-2 py-4 text-center text-gray-500 text-sm">
            Loading patients...
          </li>
        )}

        {filteredAndSortedPatients.length === 0 &&
          !patientsFromQuery.isLoading && (
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
