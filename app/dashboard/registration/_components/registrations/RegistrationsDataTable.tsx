"use client";

import React, { useState, useEffect } from "react";
import { Registration } from "@prisma/client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel, // Import for sorting
  getFilteredRowModel, // Import for filtering
  SortingState, // Type for sorting state
} from "@tanstack/react-table";
import { Button, Table, TextField, Flex, Box } from "@radix-ui/themes"; // Use Radix Table for styling, TextField for search
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"; // Icons for sorting indication
import { useRouter } from "next/navigation";

interface Props {
  registrations: Registration[];
}

const columnHelper = createColumnHelper<Registration>();

// Client component for safe date formatting (remains the same)
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

const RegistrationsDataTable = ({ registrations }: Props) => {
  const router = useRouter();
  // State for sorting
  const [sorting, setSorting] = useState<SortingState>([]);
  // State for global filtering (search)
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: "First Name",
        cell: (info) => info.getValue(),
        // enableSorting: true, // Default is true for accessor columns
      }),
      columnHelper.accessor("last_name", {
        header: "Last Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("mr_number", {
        header: "MR Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("phone_number", {
        header: "Phone Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("createdAt", {
        header: "Registered On",
        cell: (info) => <FormattedDateCell date={info.getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false, // Disable sorting for actions column
        cell: (props) => (
          <Button
            size="1"
            variant="soft"
            onClick={() => {
              router.push(
                `/dashboard/registration/${props.row.original.registration_id}`
              );
            }}
          >
            Details
          </Button>
        ),
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: registrations,
    columns,
    state: {
      // Pass state down
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting, // Function to update sorting state
    onGlobalFilterChange: setGlobalFilter, // Function to update global filter state
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting
    getFilteredRowModel: getFilteredRowModel(), // Enable filtering
  });

  return (
    <Box>
      {" "}
      {/* Wrap in a Box or Fragment */}
      {/* Search Input */}
      <Flex mb="3">
        <TextField.Root
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ maxWidth: 300 }} // Optional styling
        />
      </Flex>
      {/* Table */}
      <Table.Root variant="surface" size={"1"}>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                  onClick={header.column.getToggleSortingHandler()} // Add onClick for sorting
                >
                  <Flex align="center" gap="1">
                    {" "}
                    {/* Use Flex for alignment */}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* Add Sorting Icons */}
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
                No registrations found {globalFilter && "matching your search"}.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default RegistrationsDataTable;
