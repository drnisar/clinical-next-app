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
  Badge,
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
  Cross2Icon,
} from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDaysYMD, ymdPKT } from "@/lib/dates";
import {
  appointmentFiltersQuery,
  parseAppointmentFilters,
  resolveFilterDate,
  type AppointmentFilters,
} from "./appointmentFilters";
import SelectAppointmentType, { ALL_TYPES } from "./SelectAppointmentType";
import AppointmentActions from "./AppointmentActions";
import { APPOINTMENT_STATUSES, statusLabel } from "@/lib/appointmentStatus";
import type { AppointmentListItem } from "@/app/actions/actions";
import {
  badgeColorForAppointments,
  DAY_COLOUR,
  dateDDMMMYY,
  dateInUrdu,
  datedddDDMMMYY,
} from "../../_components/appConstants";
import { WhatsappIcon } from "../../_components/ui/WhatsappIconButton";
import ContactCard from "../../_components/ui/ContactCard";
import DialogComponent from "../../_components/ui/DialogComponent";

type AppointmentWithRegistration = AppointmentListItem;

const fullName = (a: AppointmentWithRegistration) =>
  `${a.registration.first_name} ${a.registration.last_name}`.toUpperCase();

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

const shortDate = (ymd: string) =>
  new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** A removable chip for one active filter. */
const FilterChip = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <Button
    size="1"
    variant="soft"
    radius="full"
    onClick={onRemove}
    aria-label={`Remove filter: ${label}`}
  >
    {label} <Cross2Icon />
  </Button>
);

const AppointmentsTable = ({ appointments }: Props) => {
  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  // Search stays in memory only (patient names don't belong in URLs);
  // type, status and date live in the URL.
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parseAppointmentFilters(searchParams);

  const today = ymdPKT(Date.now());
  const selectedDate = resolveFilterDate(filters.date, today);
  const showingToday = filters.date === "today" || selectedDate === today;

  const resetPage = () => setPagination((p) => ({ ...p, pageIndex: 0 }));
  const setFilters = (patch: Partial<AppointmentFilters>) => {
    resetPage();
    router.replace(
      pathname + appointmentFiltersQuery({ ...filters, ...patch }),
      { scroll: false },
    );
  };
  const changeDate = (ymd: string) => setFilters({ date: ymd || null });
  const changeType = (type: string) =>
    setFilters({ type: type === ALL_TYPES ? null : type });
  const changeStatus = (status: string) =>
    setFilters({ status: status === ALL_TYPES ? null : status });
  const changeSearch = (text: string) => {
    resetPage();
    setGlobalFilter(text);
  };
  const clearAll = () => {
    setGlobalFilter("");
    resetPage();
    router.replace(pathname, { scroll: false });
  };

  const chips = [
    globalFilter && {
      key: "search",
      label: `“${globalFilter}”`,
      onRemove: () => changeSearch(""),
    },
    filters.type && {
      key: "type",
      label: filters.type,
      onRemove: () => setFilters({ type: null }),
    },
    filters.status && {
      key: "status",
      label: statusLabel(filters.status),
      onRemove: () => setFilters({ status: null }),
    },
    selectedDate && {
      key: "date",
      label: filters.date === "today" ? "Today" : shortDate(selectedDate),
      onRemove: () => setFilters({ date: null }),
    },
  ].filter((c): c is { key: string; label: string; onRemove: () => void } =>
    Boolean(c),
  );
  const filtered = chips.length > 0;

  const appointmentsForDate = useMemo(
    () =>
      appointments.filter(
        (a) =>
          (!filters.type || a.type === filters.type) &&
          (!filters.status || a.status === filters.status) &&
          (!selectedDate ||
            (a.date_appointment &&
              ymdPKT(a.date_appointment) === selectedDate)),
      ),
    [appointments, selectedDate, filters.type, filters.status],
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
      // An accessor (not a display column) so the search box matches names.
      columnHelper.accessor(fullName, {
        id: "full_name",
        header: "Full Name",
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => (
          <Badge color={badgeColorForAppointments(info.getValue())}>
            {info.getValue()}
          </Badge>
        ),
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
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: (info) => info.getValue() ?? "N/A",
        enableSorting: false,
      }),
      // Label as the value so searching "no show" finds NO_SHOW.
      columnHelper.accessor((row) => statusLabel(row.status), {
        id: "status",
        header: "Status",
        cell: (info) => <AppointmentActions appointment={info.row.original} />,
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
      const day = a.date_appointment ? ymdPKT(a.date_appointment) : "";
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
            `${i + 1}. ${fullName(a)} – ${a.plan ?? "N/A"}`,
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
          aria-label="Search appointments (Esc to clear)"
          value={globalFilter ?? ""}
          onChange={(e) => changeSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") changeSearch("");
          }}
          style={{ flexGrow: 1, maxWidth: 300 }}
        />
        <Flex gap="2">
          <SelectAppointmentType
            value={filters.type ?? ALL_TYPES}
            onChange={changeType}
          />
          <Select.Root
            value={filters.status ?? ALL_TYPES}
            onValueChange={changeStatus}
          >
            <Select.Trigger aria-label="Filter by status" />
            <Select.Content>
              <Select.Item value={ALL_TYPES}>All statuses</Select.Item>
              {APPOINTMENT_STATUSES.map((s) => (
                <Select.Item key={s} value={s}>
                  {statusLabel(s)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>

      {/* Date filter */}
      <Flex mb="3" gap="2" align="center" wrap="wrap">
        <Flex align="center" gap="1">
          <IconButton
            variant="soft"
            aria-label="Previous day"
            title="Previous day"
            onClick={() => changeDate(addDaysYMD(selectedDate || today, -1))}
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
            onClick={() => changeDate(addDaysYMD(selectedDate || today, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Flex>
        {/* "today" in the URL keeps meaning today, so it can be bookmarked */}
        <Button
          variant={showingToday ? "solid" : "soft"}
          onClick={() => changeDate(showingToday ? "" : "today")}
        >
          Today&apos;s appointments
        </Button>
      </Flex>

      {/* Active filters: one chip each, plus Clear all */}
      {filtered && (
        <Flex mb="3" gap="2" align="center" wrap="wrap">
          <Text size="2" color="gray">
            Filters:
          </Text>
          {chips.map((c) => (
            <FilterChip key={c.key} label={c.label} onRemove={c.onRemove} />
          ))}
          <Button size="1" variant="ghost" color="red" onClick={clearAll}>
            Clear all
          </Button>
        </Flex>
      )}
      <Text as="div" size="2" color="gray" mb="3">
        {filtered
          ? `${shareRows.length} of ${appointments.length} appointments`
          : `${appointments.length} appointments`}
      </Text>

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
                      {fullName(appt)}
                    </Text>
                    <Text size="2" weight="medium" style={{ flexShrink: 0 }}>
                      <FormattedDateCell date={appt.date_appointment} />
                    </Text>
                  </Flex>
                  <Text size="2">
                    <Badge color={badgeColorForAppointments(appt.type)}>
                      {appt.type}
                    </Badge>{" "}
                    <Text weight="medium">Plan:</Text> {appt.plan ?? "N/A"}
                  </Text>
                  {appt.notes && (
                    <Text size="2" color="gray">
                      {appt.notes}
                    </Text>
                  )}
                  <Flex justify="between" align="center" gap="2" wrap="wrap" mt="1">
                    <AppointmentActions appointment={appt} />
                    {phone && <PhoneWithContact appt={appt} />}
                  </Flex>
                </Flex>
              </Box>
            </Theme>
          );
        })}
        {table.getRowModel().rows.length === 0 && (
          <Flex direction="column" align="center" gap="2" py="3">
            <Text size="2" color="gray">
              No appointments found{filtered && " for these filters"}.
            </Text>
            {filtered && (
              <Button size="1" variant="soft" onClick={clearAll}>
                Clear filters
              </Button>
            )}
          </Flex>
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
                  <Flex direction="column" align="center" gap="2" py="2">
                    <Text color="gray">
                      No appointments found{filtered && " for these filters"}.
                    </Text>
                    {filtered && (
                      <Button size="1" variant="soft" onClick={clearAll}>
                        Clear filters
                      </Button>
                    )}
                  </Flex>
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
