"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { drugKey, type FrequentDrug } from "./medicationHelpers";

/**
 * Drugs you prescribe most (from past consultations and discharges) with their
 * usual dosing, for drug-name suggestions. Loaded once and cached for 10 min.
 * Suggestions are a convenience: if they fail to load the form still works.
 */
export function useFrequentMeds() {
  const query = useQuery<FrequentDrug[]>({
    queryKey: ["meds-frequent"],
    queryFn: async () =>
      (await axios.get<FrequentDrug[]>("/api/meds/frequent")).data,
    staleTime: 10 * 60 * 1000,
  });
  const drugs = useMemo(() => query.data ?? [], [query.data]);
  const byKey = useMemo(
    () => new Map(drugs.map((d) => [drugKey(d.drug_name), d])),
    [drugs],
  );
  return { drugs, byKey };
}
