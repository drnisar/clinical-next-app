"use client"; // Required for state and effects

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TextField,
  Flex,
  Box,
  Button,
  IconButton,
  Text,
  Select,
  Theme,
} from "@radix-ui/themes";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
// import { useAppointmentsStore } from "./AppointmentsStore";
import SelectAppointmentType from "./SelectAppointmentType";
import { Appointment, Registration } from "@/generated/prisma";
import {
  DAY_COLOUR,
  dateDDMMMYY,
  dateInUrdu,
  datedddDDMMMYY,
} from "../../_components/appConstants";
import { WhatsappIcon } from "../../_components/ui/WhatsappIconButton";
import ContactCard from "../../_components/ui/ContactCard";
import DialogComponent from "../../_components/ui/DialogComponent";

// Keep your existing Appointment type
type AppointmentWithRegistration = Appointment & { registration: Registration };

const columnHelper = createColumnHelper<AppointmentWithRegistration>();

// Client component for safe date formatting
const FormattedDateCell = ({ date }: { date: Date | null | undefined }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    if (date) {
      // Using toDateString as in your original code
      setFormattedDate(new Date(date).toDateString());
    } else {
      setFormattedDate(null);
    }
  }, [date]);
  return <>{formattedDate ?? "N/A"}</>;
};

// "Contact" button that opens ContactCard
// (call / SMS / WhatsApp reminder), as on the dashboard's upcoming list.
const PhoneWithContact = ({ appt }: { appt: AppointmentWithRegistration }) => {
  const { code, phone_number, gender, first_name, last_name } =
    appt.registration;
  const local = (phone_number ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (!local) return <Text color="gray">N/A</Text>;

  return (
    <Flex align="center" gap="2" wrap="nowrap">
      <DialogComponent
        triggerButtonText="Contact"
        triggerButtonVariant="soft"
        triggerButtonColor="grass"
        titleText="Contact Details"
        content={
          <ContactCard
            phoneNumber={`${code || "+92"}${local}`}
            appointmentDateEnglish={dateDDMMMYY(appt.date_appointment)}
            appointmentDateUrdu={dateInUrdu(appt.date_appointment)}
            patient={`${gender === "male" ? "Mr. " : "Ms. "}${first_name} ${last_name}`}
          />
        }
      />
    </Flex>
  );
};

interface Props {
  appointments: AppointmentWithRegistration[];
}

// Local calendar date as "YYYY-MM-DD" (the format <input type="date"> uses).
const toLocalYMD = (date: Date | string) => {
  const d = new Date(date);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

// Move a "YYYY-MM-DD" date by n days (local calendar, DST-safe).
const shiftDate = (ymd: string, n: number) => {
  const d = new Date(`${ymd}T00:00`);
  d.setDate(d.getDate() + n);
  return toLocalYMD(d);
};

const AppointmentsTable = ({ appointments }: Props) => {
  // State for table features
  // const { appointments } = useAppointmentsStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // "" = all dates
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const changeDate = (ymd: string) => {
    setSelectedDate(ymd);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };
  const today = toLocalYMD(new Date());
  const showingToday = selectedDate === today;

  const appointmentsForDate = useMemo(
    () =>
      selectedDate
        ? appointments.filter(
            (a) =>
              a.date_appointment &&
              toLocalYMD(a.date_appointment) === selectedDate,
          )
        : appointments,
    [appointments, selectedDate],
  );

  // Define columns
  const columns = useMemo(
    () => [
      // Serial Number Column
      columnHelper.display({
        id: "s_no",
        header: "S. No",
        // Access row.index which is available in the cell context
        cell: (info) =>
          info.row.index + 1 + pagination.pageIndex * pagination.pageSize,
        enableSorting: false,
      }),
      columnHelper.display({
        id: "full_name",
        header: "Full Name",
        cell: (info) => {
          const { first_name, last_name } = info.row.original.registration;
          return `${first_name} ${last_name}`.toUpperCase();
        },
      }),
      columnHelper.accessor("plan", {
        header: "Plan",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("date_appointment", {
        header: "Date",
        cell: (info) => <FormattedDateCell date={info.getValue()} />,
      }),
      columnHelper.accessor((row) => row.registration?.phone_number, {
        id: "phone_number",
        header: "Contact",
        cell: (info) => <PhoneWithContact appt={info.row.original} />,
      }),
      // columnHelper.accessor("type", {
      //   header: "Type",
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: (info) => info.getValue() ?? "N/A",
        enableSorting: false,
      }),
      // Optional: Add an actions column if needed
      // columnHelper.display({
      //   id: 'actions',
      //   header: 'Actions',
      //   cell: props => <Button size="1">View</Button>
      // })
    ],
    [pagination.pageIndex, pagination.pageSize], // Add pagination state to dependencies for S.No calculation
  );

  // useReactTable hook
  const table = useReactTable({
    data: appointmentsForDate,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true, // Uncomment for debugging
  });

  // WhatsApp message: every appointment matching the current date/search
  // filter (all pages), grouped by day, as "name – plan" lines.
  const shareRows = table.getPrePaginationRowModel().rows;
  const whatsappUrl = useMemo(() => {
    const byDay = new Map<string, AppointmentWithRegistration[]>();
    for (const { original: a } of shareRows) {
      const day = a.date_appointment ? toLocalYMD(a.date_appointment) : "";
      byDay.set(day, [...(byDay.get(day) ?? []), a]);
    }
    const sections = [...byDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, appts]) => {
        const heading = day
          ? datedddDDMMMYY(new Date(`${day}T00:00`))
          : "No date";
        const lines = appts.map(
          (a, i) =>
            `${i + 1}. ${`${a.registration.first_name} ${a.registration.last_name}`.toUpperCase()} – ${a.plan ?? "N/A"}`,
        );
        return [`*${heading}*`, ...lines].join("\n");
      });
    const message = ["*Appointments*", ...sections].join("\n\n");
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [shareRows]);

  return (
    <Box>
      {/* Search Input */}
      <Flex mb="3" justify={"between"} gap="2" wrap="wrap">
        <TextField.Root
          placeholder="Search appointments..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ flexGrow: 1, maxWidth: 300 }}
        />
        <SelectAppointmentType />
      </Flex>

      {/* Date filter */}
      <Flex mb="3" gap="2" align="center" wrap="wrap">
        <Flex align="center" gap="1">
          <IconButton
            variant="soft"
            aria-label="Previous day"
            title="Previous day"
            onClick={() => changeDate(shiftDate(selectedDate || today, -1))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <TextField.Root
            type="date"
            aria-label="Filter by appointment date"
            value={selectedDate}
            onChange={(e) => changeDate(e.target.value)}
            style={{ width: 170 }}
          />
          <IconButton
            variant="soft"
            aria-label="Next day"
            title="Next day"
            onClick={() => changeDate(shiftDate(selectedDate || today, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Flex>
        <Button
          variant={showingToday ? "solid" : "soft"}
          onClick={() => changeDate(showingToday ? "" : today)}
        >
          Today&apos;s appointments
        </Button>
        {selectedDate && (
          <Button variant="ghost" color="gray" onClick={() => changeDate("")}>
            Show all dates
          </Button>
        )}
        {selectedDate && (
          <Text size="2" color="gray">
            {appointmentsForDate.length} appointment
            {appointmentsForDate.length === 1 ? "" : "s"} on{" "}
            {new Date(`${selectedDate}T00:00`).toDateString()}
          </Text>
        )}
      </Flex>

      {/* WhatsApp share: phones and small screens only, once a date is chosen */}
      {selectedDate && (
        <Flex mb="3" display={{ initial: "flex", sm: "none" }}>
          {shareRows.length > 0 ? (
            <Button color="grass" asChild style={{ width: "100%" }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon /> Send on WhatsApp ({shareRows.length})
              </a>
            </Button>
          ) : (
            <Button color="grass" disabled style={{ width: "100%" }}>
              <WhatsappIcon /> Send on WhatsApp
            </Button>
          )}
        </Flex>
      )}

      {/* Cards: phones and small screens (below the sm breakpoint, 768px) */}
      <Flex
        direction="column"
        gap="2"
        display={{ initial: "flex", sm: "none" }}
      >
        {table.getRowModel().rows.map((row) => {
          const appt = row.original;
          const phone = appt.registration?.phone_number;
          return (
            // Light theme so text stays dark on the pastel day colours.
            <Theme key={row.id} appearance="light" hasBackground={false}>
              <Box
                p="3"
                className="rounded-lg border"
                style={{
                  background: DAY_COLOUR(appt.date_appointment) ?? "#fff",
                }}
              >
                <Flex direction="column" gap="1">
                  <Flex justify="between" align="start" gap="2">
                    <Text
                      weight="bold"
                      size="3"
                      style={{ wordBreak: "break-word" }}
                    >
                      {`${appt.registration.first_name} ${appt.registration.last_name}`.toUpperCase()}
                    </Text>
                    <Text size="2" weight="medium" style={{ flexShrink: 0 }}>
                      <FormattedDateCell date={appt.date_appointment} />
                    </Text>
                  </Flex>
                  <Text size="2">
                    <Text weight="medium">Plan:</Text> {appt.plan ?? "N/A"}
                  </Text>
                  {appt.notes && (
                    <Text size="2" color="gray">
                      {appt.notes}
                    </Text>
                  )}
                  {phone && (
                    <Text size="2" as="div">
                      <PhoneWithContact appt={appt} />
                    </Text>
                  )}
                </Flex>
              </Box>
            </Theme>
          );
        })}
        {table.getRowModel().rows.length === 0 && (
          <Text size="2" align="center" color="gray">
            No appointments found {globalFilter && "matching your search"}.
          </Text>
        )}
      </Flex>

      {/* Table: tablets and larger */}
      <Box display={{ initial: "none", sm: "block" }}>
        <Table.Root variant="surface">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex align="center" gap="1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {{
                        asc: <TriangleUpIcon />,
                        desc: <TriangleDownIcon />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                style={{
                  background:
                    DAY_COLOUR(row.getValue("date_appointment")) ?? "#fff",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={columns.length} align="center">
                  No appointments found {globalFilter && "matching your search"}
                  .
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Pagination Controls: stack on small screens */}
      <Flex
        direction={{ initial: "column", sm: "row" }}
        align="center"
        justify="between"
        mt="4"
        gap="3"
      >
        <Text size="2">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </Text>
        <Flex gap="1">
          <Button
            variant="soft"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="1"
          >
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            variant="soft"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="1"
          >
            <ChevronLeftIcon /> Prev
          </Button>
          <Button
            variant="soft"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="1"
          >
            Next <ChevronRightIcon />
          </Button>
          <Button
            variant="soft"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="1"
          >
            <DoubleArrowRightIcon />
          </Button>
        </Flex>
        {/* Optional: Page size selector */}
        <Select.Root
          size="1"
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <Select.Trigger placeholder="Rows per page" />
          <Select.Content>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <Select.Item key={pageSize} value={String(pageSize)}>
                Show {pageSize}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>
  );
};

export default AppointmentsTable;
