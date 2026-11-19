"use client";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { colorForStatus } from "../../_components/appConstants";
import { ReloadIcon } from "@radix-ui/react-icons";
import { calculateAgeFromDate } from "../today/_components/TodaysConsultationsTable";
import { useTodaysPatients, type QueuePatient } from "./edit/useTodaysPatients";

const STATUS_FILTERS = [
  { value: "QUEUED", label: "Queued", color: "orange" },
  { value: "IN_PROGRESS", label: "In progress", color: "blue" },
  { value: "COMPLETED", label: "Completed", color: "green" },
] as const;

interface Props {
  /** consultation_id of the patient being seen (highlighted). */
  id?: string;
  /** Called after a patient is picked (e.g. to close the mobile drawer). */
  onNavigate?: () => void;
}

const TodaysPatientsSideBar = ({ id, onNavigate }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const patientsQuery = useTodaysPatients();
  const patients = useMemo(
    () => patientsQuery.data ?? [],
    [patientsQuery.data],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of patients) c[p.status] = (c[p.status] ?? 0) + 1;
    return c;
  }, [patients]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return patients.filter((p: QueuePatient) => {
      if (statusFilter && p.status !== statusFilter) return false;
      const first = p.registration?.first_name?.toLowerCase() ?? "";
      const last = p.registration?.last_name?.toLowerCase() ?? "";
      return !q || first.includes(q) || last.includes(q);
    });
  }, [patients, search, statusFilter]);

  return (
    <Flex direction="column" gap="2">
      <Flex align="center" justify="between">
        <Text weight="bold" size="3">
          Today&apos;s patients ({patients.length})
        </Text>
        <Button
          variant="ghost"
          size="1"
          onClick={() => patientsQuery.refetch()}
          disabled={patientsQuery.isFetching}
          aria-label="Refresh today's patients"
          title="Refresh"
        >
          <ReloadIcon
            className={patientsQuery.isFetching ? "animate-spin" : ""}
          />
        </Button>
      </Flex>

      {/* Status chips: counts, tap to filter (tap again to clear) */}
      <Flex gap="1" wrap="wrap">
        {STATUS_FILTERS.map((s) => {
          const active = statusFilter === s.value;
          return (
            <Button
              key={s.value}
              size="1"
              radius="full"
              color={s.color}
              variant={active ? "solid" : "soft"}
              aria-pressed={active}
              onClick={() => setStatusFilter(active ? null : s.value)}
            >
              {s.label} {counts[s.value] ?? 0}
            </Button>
          );
        })}
      </Flex>

      <TextField.Root
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="2"
        placeholder="Search patients..."
      />

      <ul className="space-y-1">
        {visible.map((patient, index) => {
          const current = patient.consultation_id === id;
          const age = calculateAgeFromDate(patient.registration?.date_of_birth);
          return (
            <li key={patient.consultation_id}>
              <Link
                href={`/dashboard/consultation/edit/${patient.consultation_id}`}
                aria-current={current ? "page" : undefined}
                onClick={onNavigate}
                className={`block rounded-md px-2 py-2 text-sm transition-colors hover:brightness-95 ${colorForStatus(
                  patient.status,
                )} ${current ? "font-bold ring-2 ring-[var(--accent-9)]" : ""}`}
              >
                {index + 1}.{" "}
                {patient.registration?.first_name?.toUpperCase() || "Unknown"}{" "}
                {patient.registration?.last_name?.toUpperCase() || ""}
                <span className="opacity-75">
                  {age !== null ? ` · ${age}` : ""}
                  {patient.registration?.gender === "male" ? " (M)" : " (F)"}
                </span>
              </Link>
            </li>
          );
        })}

        {patientsQuery.isLoading && (
          <li className="px-2 py-4 text-center text-sm text-gray-500">
            Loading patients...
          </li>
        )}
        {patientsQuery.isError && (
          <li className="px-2 py-4 text-center text-sm text-red-600">
            Couldn&apos;t load today&apos;s patients.
          </li>
        )}
        {!patientsQuery.isLoading &&
          !patientsQuery.isError &&
          visible.length === 0 && (
            <li className="px-2 py-4 text-center text-sm text-gray-500">
              {search || statusFilter
                ? "No patients match"
                : "No patients for today"}
            </li>
          )}
      </ul>
    </Flex>
  );
};

export default TodaysPatientsSideBar;
