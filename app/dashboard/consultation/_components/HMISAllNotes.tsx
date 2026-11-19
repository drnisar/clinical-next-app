"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  fetchPatientClinicalHistory,
  type HMISClinicalHistory,
  type HMISInvestigation,
  type HMISLabResult,
} from "./HMISNotes";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Switch,
  Table,
  Tabs,
  Text,
} from "@radix-ui/themes";

interface Props {
  mrn: string;
}

// HMIS dates are local-time ISO strings without a zone ("2026-11-17T10:30:00").
const formatHMISDate = (value?: string | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// HMIS puts a result in one of three fields: numeric values in resultNumeric
// (0 is a valid value), free-text results in resultText, rarely resultValue.
export const displayResult = (r: HMISLabResult) => {
  if (r.resultValue?.trim()) return r.resultValue;
  if (r.resultNumeric !== null && r.resultNumeric !== undefined)
    return String(r.resultNumeric);
  if (r.resultText?.trim()) return r.resultText;
  return "—";
};

// ISO strings sort chronologically as plain strings; newest first.
const byDateDesc = (a?: string | null, b?: string | null) =>
  (b ?? "").localeCompare(a ?? "");

// Collapsible investigation: the header (name, department, date and an
// "Abnormal" badge if any result is out of range) toggles the results table.
const InvestigationTable = ({ inv }: { inv: HMISInvestigation }) => {
  const results = inv.results ?? []; // already de-duplicated per report time
  const abnormalCount = results.filter((r) => r.normal === "N").length;
  // Parameters measured more than once in this report show their report time.
  const timesPerParam = results.reduce(
    (m, r) => m.set(r.parameterId, (m.get(r.parameterId) ?? 0) + 1),
    new Map<string, number>(),
  );
  return (
    <Card size="1" asChild>
      <details className="group">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <Flex justify="between" align="start" gap="2">
            <Flex align="start" gap="2" style={{ minWidth: 0 }}>
              <ChevronRightIcon
                className="mt-1 shrink-0 transition-transform group-open:rotate-90"
                aria-hidden
              />
              <Box style={{ minWidth: 0 }}>
                <Flex align="center" gap="2" wrap="wrap">
                  <Text weight="bold">{inv.investigationName}</Text>
                  {abnormalCount > 0 && (
                    <Badge color="red" variant="solid">
                      Abnormal{abnormalCount > 1 ? ` (${abnormalCount})` : ""}
                    </Badge>
                  )}
                </Flex>
                <Text as="div" size="1" color="gray">
                  {inv.departmentName}
                  {inv.orderNo ? ` · Order ${inv.orderNo}` : ""}
                </Text>
              </Box>
            </Flex>
            <Text size="1" color="gray" style={{ flexShrink: 0 }}>
              {formatHMISDate(inv.reportDate || inv.trnDate)}
            </Text>
          </Flex>
        </summary>

        <Box mt="2">
          {results.length === 0 ? (
            <Text size="2" color="gray">
              {inv.reportAvailable === "Y"
                ? "No values reported."
                : "Report pending."}
            </Text>
          ) : (
            <Box style={{ overflowX: "auto" }}>
              <Table.Root size="1" variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Test</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Result</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Normal range
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {results.map((r) => {
                    const abnormal = r.normal === "N";
                    const repeated =
                      (timesPerParam.get(r.parameterId) ?? 0) > 1;
                    return (
                      <Table.Row key={`${r.parameterId}-${r.reportDate}`}>
                        <Table.Cell>{r.parameterName}</Table.Cell>
                        <Table.Cell>
                          <Text
                            color={abnormal ? "red" : undefined}
                            weight={abnormal ? "bold" : undefined}
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {displayResult(r)}
                          </Text>
                          {abnormal && (
                            <Badge color="red" variant="soft" ml="2">
                              Abnormal
                            </Badge>
                          )}
                          {repeated && (
                            <Text as="div" size="1" color="gray">
                              {formatHMISDate(r.reportDate)}
                            </Text>
                          )}
                        </Table.Cell>
                        <Table.Cell>{r.rangeText?.trim() || "—"}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </Box>
          )}
        </Box>
      </details>
    </Card>
  );
};

const HMISAllNotes = ({ mrn }: Props) => {
  const [history, setHistory] = useState<HMISClinicalHistory>({
    physicianNotes: [],
    investigations: [],
  });
  const [loading, setLoading] = useState(false);
  const [abnormalOnly, setAbnormalOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPatientClinicalHistory(mrn).then(
      ({ physicianNotes, investigations }) => {
        setHistory({
          physicianNotes: [...physicianNotes].sort((a, b) =>
            byDateDesc(a.notesDate, b.notesDate),
          ),
          investigations: [...investigations].sort((a, b) =>
            byDateDesc(a.reportDate || a.trnDate, b.reportDate || b.trnDate),
          ),
        });
        setLoading(false);
      },
    );
  }, [mrn]);

  if (loading) return <div>Loading HMIS notes and labs ...</div>;

  const { physicianNotes, investigations } = history;
  // Investigations with at least one result flagged abnormal by HMIS.
  const abnormalInvestigations = investigations.filter((inv) =>
    (inv.results ?? []).some((r) => r.normal === "N"),
  );
  const shownInvestigations = abnormalOnly
    ? abnormalInvestigations
    : investigations;

  return (
    <Tabs.Root defaultValue="notes">
      <Tabs.List>
        <Tabs.Trigger value="notes">
          Clinical notes ({physicianNotes.length})
        </Tabs.Trigger>
        <Tabs.Trigger value="labs">
          Lab results ({investigations.length})
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="notes">
        <Box pt="3">
          {physicianNotes.length > 0 ? (
            physicianNotes.map((note, index) => (
              <div
                key={`${note.noteId}-${index}`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                <Heading size="2">
                  {note.writerUserName} - - {formatHMISDate(note.notesDate)}
                </Heading>
                <p>{note.clinicDesc}</p>
                <p>{note.notes}</p>
                <Separator my="3" size="4" />
              </div>
            ))
          ) : (
            <p>No notes found</p>
          )}
        </Box>
      </Tabs.Content>

      {/* Most recent investigation first (report date, else order date). */}
      <Tabs.Content value="labs">
        <Box pt="3">
          {investigations.length > 0 && (
            <Text
              as="label"
              size="2"
              mb="3"
              className="flex items-center gap-2"
            >
              <Switch
                checked={abnormalOnly}
                onCheckedChange={setAbnormalOnly}
                color="red"
              />
              Abnormal only ({abnormalInvestigations.length})
            </Text>
          )}
          {shownInvestigations.length > 0 ? (
            <Flex direction="column" gap="3">
              {shownInvestigations.map((inv, index) => (
                <InvestigationTable
                  key={`${inv.ocptKey || inv.orderNo}-${index}`}
                  inv={inv}
                />
              ))}
            </Flex>
          ) : (
            <p>
              {abnormalOnly && investigations.length > 0
                ? "No abnormal lab results"
                : "No lab results found"}
            </p>
          )}
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default HMISAllNotes;
