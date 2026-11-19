"use client";
import type { Consultation, Registration } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type QueuePatient = Consultation & { registration: Registration };

/**
 * Today's consultation queue, shared (one cache entry, one request) by the
 * queue sidebar and the patient bar's "Next patient" button. Order comes from
 * /api/consultation/today: queued first, then in progress, then completed,
 * each by visit time.
 */
export const useTodaysPatients = () =>
  useQuery<QueuePatient[]>({
    queryKey: ["todaysPatients"],
    queryFn: async () => {
      try {
        const response = await axios.get<QueuePatient[]>(
          "/api/consultation/today",
        );
        return response.data;
      } catch (error) {
        // The API answers 404 when nobody is booked today: an empty queue.
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return [];
        }
        throw error;
      }
    },
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
  });
