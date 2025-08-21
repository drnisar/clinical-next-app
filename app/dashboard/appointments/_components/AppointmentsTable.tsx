"use client"; // Required for state and effects

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TextField,
  Flex,
  Box,
  Button,
  Text,
  Select,
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
import { useAppointmentsStore } from "./AppointmentsStore";
import SelectAppointmentType from "./SelectAppointmentType";
import { Appointment, Registration } from "@/generated/prisma";

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

const AppointmentsTable = () => {
  // State for table features
  const { appointments } = useAppointmentsStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
        header: "Phone Number",
        cell: (info) => (
          <a href={`tel:0${info.getValue() ?? ""}`}>
            {"0" + (info.getValue() ?? "")}
          </a>
        ),
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
    [pagination.pageIndex, pagination.pageSize] // Add pagination state to dependencies for S.No calculation
  );

  // useReactTable hook
  const table = useReactTable({
    data: appointments,
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

  return (
    <Box>
      {/* Search Input */}
      <Flex mb="3" justify={"between"}>
        <TextField.Root
          placeholder="Search appointments..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <SelectAppointmentType />
      </Flex>

      {/* Table */}
      <Table.Root variant="surface">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Flex align="center" gap="1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                No appointments found {globalFilter && "matching your search"}.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {/* Pagination Controls */}
      <Flex align="center" justify="between" mt="4" gap="3">
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
            <ChevronLeftIcon /> Previous
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
