"use client";
import { Admission_Discharge, Registration } from "@/generated/prisma";
import {
  Badge,
  Button,
  Card,
  Table,
  Flex,
  Box,
  TextField,
  Text,
} from "@radix-ui/themes"; // Import necessary Radix components
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useTransition, useMemo } from "react"; // Import React hooks
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel, // Import for pagination
  SortingState,
  PaginationState, // Type for pagination state
} from "@tanstack/react-table";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"; // Icons

// Ensure the type includes the nested Registration object correctly
type AdmissionWithRegistration = Admission_Discharge & {
  registration: Registration | null; // Use lowercase 'r' as established before
};

interface Props {
  admissions: AdmissionWithRegistration[];
}

const columnHelper = createColumnHelper<AdmissionWithRegistration>();

// Client component for safe date formatting
const FormattedDateCell = ({ date }: { date: Date | null | undefined }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleDateString("en-GB"));
    } else {
      setFormattedDate(null);
    }
  }, [date]);
  return <>{formattedDate ?? "N/A"}</>;
};

const CurrentlyAdmittedList = ({ admissions }: Props) => {
  const router = useRouter();
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const [isNavPending, startTransition] = useTransition();

  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // Initial page index
    pageSize: 10, // Rows per page
  });

  const badgeColor = (admissionMode: string | null | undefined) => {
    switch (admissionMode) {
      case "SEHAT_CARD":
        return "green";
      case "IBP":
        return "blue";
      case "EMERGENCY":
        return "red";
      default:
        return "gray";
    }
  };

  const handleDetailsClick = React.useCallback(
    (admissionId: string) => {
      setNavigatingId(admissionId);
      startTransition(() => {
        router.push("/dashboard/admissions/" + admissionId);
      });
    },
    [router, startTransition],
  );
  const handleDischargeClick = React.useCallback(
    (admissionId: string) => {
      setNavigatingId(admissionId);
      startTransition(() => {
        router.push("/dashboard/discharge/" + admissionId);
      });
    },
    [router, startTransition],
  );

  // Details / Discharge buttons, shared by the mobile cards and the table.
  const renderActions = React.useCallback(
    (admissionId: string) => {
      const isButtonDisabled = isNavPending && navigatingId === admissionId;
      return (
        <Flex gap="1">
          <Button
            size={"1"}
            variant="soft"
            color="grass"
            onClick={() => handleDetailsClick(admissionId)}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Loading..." : "Details"}
          </Button>
          <Button
            size={"1"}
            variant="soft"
            color="blue"
            onClick={() => handleDischargeClick(admissionId)}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Loading..." : "Discharge"}
          </Button>
        </Flex>
      );
    },
    [isNavPending, navigatingId, handleDetailsClick, handleDischargeClick],
  );

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) =>
          `${row.registration?.first_name || ""} ${
            row.registration?.last_name || ""
          }`,
        {
          id: "patient_name", // Need an ID for accessor functions
          header: "Patient Name",
          cell: (info) => info.getValue().toUpperCase(),
        },
      ),
      columnHelper.accessor((row) => row.registration?.gender, {
        id: "gender",
        header: "Gender",
        cell: (info) => info.getValue()?.toUpperCase() ?? "N/A",
      }),
      columnHelper.accessor((row) => row.registration?.mr_number, {
        id: "mr_number",
        header: "MR Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("admission_date", {
        header: "Admission Date",
        cell: (info) => <FormattedDateCell date={info.getValue()} />,
      }),
      columnHelper.accessor(
        (row) => `${row.ward || ""} ${row.bed_number || ""}`,
        {
          id: "bed",
          header: "Bed",
          cell: (info) => info.getValue().trim() || "N/A",
        },
      ),
      columnHelper.accessor("admission_mode", {
        header: "Mode",
        cell: (info) => (
          <Badge color={badgeColor(info.getValue())}>
            {info.getValue() ?? "N/A"}
          </Badge>
        ),
      }),
      columnHelper.accessor("admission_plan", {
        header: "Plan",
        cell: (info) => info.getValue() ?? "N/A",
        enableSorting: false, // Example: disable sorting for plan
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: (props) => renderActions(props.row.original.admission_id),
      }),
    ],
    [renderActions], // Include dependencies used in column defs
  );

  // useReactTable hook
  const table = useReactTable({
    data: admissions,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // Handle pagination state changes
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    // debugTable: true, // Uncomment for debugging
  });

  return (
    <Box>
      {/* Search Input */}
      <Flex mb="3">
        <TextField.Root
          placeholder="Search admissions..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ width: "100%", maxWidth: 300 }}
        />
      </Flex>

      {/* Cards: phones and small screens (below the sm breakpoint, 768px) */}
      <Flex
        direction="column"
        gap="2"
        display={{ initial: "flex", sm: "none" }}
      >
        {table.getRowModel().rows.map((row) => {
          const adm = row.original;
          const bed = row.getValue<string>("bed").trim();
          return (
            <Card key={row.id} size="1">
              <Flex direction="column" gap="2">
                <Flex justify="between" align="start" gap="2">
                  <Text
                    weight="bold"
                    size="3"
                    style={{ wordBreak: "break-word" }}
                  >
                    {row.getValue<string>("patient_name").toUpperCase()}
                  </Text>
                  <Badge
                    color={badgeColor(adm.admission_mode)}
                    style={{ flexShrink: 0 }}
                  >
                    {adm.admission_mode ?? "N/A"}
                  </Badge>
                </Flex>
                <Flex gap="3" wrap="wrap">
                  <Text size="2" color="gray">
                    MR {adm.registration?.mr_number ?? "N/A"}
                  </Text>
                  <Text size="2" color="gray">
                    {adm.registration?.gender?.toUpperCase() ?? "N/A"}
                  </Text>
                  <Text size="2" weight="medium">
                    Bed: {bed || "N/A"}
                  </Text>
                  <Text size="2" color="gray">
                    Admitted <FormattedDateCell date={adm.admission_date} />
                  </Text>
                </Flex>
                {adm.admission_plan && (
                  <Text size="2">
                    <Text weight="medium">Plan:</Text> {adm.admission_plan}
                  </Text>
                )}
                {renderActions(adm.admission_id)}
              </Flex>
            </Card>
          );
        })}
        {table.getRowModel().rows.length === 0 && (
          <Text size="2" align="center" color="gray">
            No admissions found {globalFilter && "matching your search"}.
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
              <Table.Row key={row.id}>
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
                  No admissions found {globalFilter && "matching your search"}.
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
      </Flex>
    </Box>
  );
};

export default CurrentlyAdmittedList;
