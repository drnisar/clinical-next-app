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
import { useRouter } from "next/navigation";
import { Consultation, Registration } from "@/generated/prisma";
import StatusChangeComponent from "./StatusChangeComponent";

// type Consultation = Omit<Clinic_Visit, "Registration"> & {
//   registration: PrismaRegistration | null;
// };

type consultation = Consultation & {
  registration: Registration | null;
};
interface Props {
  consultations: consultation[];
}

const columnHelper = createColumnHelper<consultation>();

const FormattedDateCell = ({ date }: { date: Date | null | undefined }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleDateString("en-GB")); // Adjust locale as needed
    } else {
      setFormattedDate(null);
    }
  }, [date]);
  return <>{formattedDate ?? "N/A"}</>;
};

const ConsultationsTable = ({ consultations }: Props) => {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "s_no",
        header: "S. No",
        // Access row.index which is available in the cell context
        cell: (info) =>
          info.row.index + 1 + pagination.pageIndex * pagination.pageSize,
        enableSorting: false,
      }),
      columnHelper.accessor(
        (row) =>
          `${row.registration?.first_name || ""} ${
            row.registration?.last_name || ""
          }`.toUpperCase(),
        {
          id: "patient_name",
          header: "Patient Name",
          cell: (info) => info.getValue() || "N/A",
        }
      ),
      columnHelper.accessor((row) => row.registration?.mr_number, {
        id: "mr_number",
        header: "MR Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor((row) => row.registration?.gender.toUpperCase(), {
        id: "gender",
        header: "Gender",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      // Accessing consultation data (use correct field names from Clinic_Visit or mapped names)
      columnHelper.accessor("visit_date", {
        // Use 'visit_date' from Clinic_Visit
        header: "Consultation Date",
        cell: (info) => <FormattedDateCell date={info.getValue()} />,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const consultation_id = info.row.original.consultation_id;

          return (
            <StatusChangeComponent
              consultation_id={consultation_id}
              status={status || ""}
            />
          );
        },
      }),
      columnHelper.accessor("diagnosis", {
        header: "Notes",
        cell: (info) => info.getValue() ?? "N/A",
        enableSorting: false,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: (props) => (
          <Flex gap="1">
            <Button
              size="1"
              variant="soft"
              onClick={() => {
                router.push(
                  `/dashboard/consultation/edit/${props.row.original.consultation_id}` // Use 'visit_id'
                );
              }}
            >
              Clinical Info
            </Button>
            <Button
              size="1"
              variant="soft"
              color="blue"
              onClick={() => {
                router.push(
                  `/dashboard/registration/${props.row.original.registration?.registration_id}` // Use 'visit_id'
                );
              }}
            >
              Details
            </Button>
          </Flex>
        ),
      }),
    ],
    [pagination.pageIndex, pagination.pageSize, router]
  );

  const table = useReactTable<consultation>({
    data: consultations || [],
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
    // debugTable: true,
  });

  return (
    <Box>
      <Flex mb="3">
        <TextField.Root
          placeholder="Search consultations..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ maxWidth: 300 }}
        />
      </Flex>

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
                No consultations found {globalFilter && "matching your search"}.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      <Flex align="center" justify="between" mt="4" gap="3">
        <Text size="2">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>{" "}
          ({table.getFilteredRowModel().rows.length} total rows)
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

export default ConsultationsTable;
