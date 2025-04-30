"use client";
import { Registration } from "@prisma/client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Select,
  Spinner,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation"; // Use router for programmatic navigation if needed
import React, { useEffect, useMemo, useState, useTransition } from "react"; // Import hooks

interface Props {
  registrations: Registration[];
}

const columnHelper = createColumnHelper<Registration>();

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

// Component for Action Buttons to manage state individually
const ActionButtons = ({ registrationId }: { registrationId: number }) => {
  const router = useRouter();
  const [isNavigatingView, startViewTransition] = useTransition();
  const [isNavigatingEdit, startEditTransition] = useTransition();

  const handleNavigate = (
    path: string,
    startTransition: React.TransitionStartFunction
  ) => {
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <Flex gap="2">
      {/* Using Button with onClick and useTransition */}
      <Button
        size={"1"}
        color="grass"
        variant="soft"
        disabled={isNavigatingView || isNavigatingEdit} // Disable both if either is navigating
        onClick={() =>
          handleNavigate(
            `/dashboard/registration/${registrationId}`,
            startViewTransition
          )
        }
      >
        {isNavigatingView ? <Spinner size="1" /> : "View"}
      </Button>
      <Button
        size={"1"}
        color="blue"
        variant="soft"
        disabled={isNavigatingEdit || isNavigatingView} // Disable both if either is navigating
        onClick={() =>
          handleNavigate(
            `/dashboard/registration/edit/${registrationId}`,
            startEditTransition
          )
        }
      >
        {isNavigatingEdit ? <Spinner size="1" /> : "Edit"}
      </Button>
    </Flex>
  );
};

const RegistrationsTable = ({ registrations }: Props) => {
  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: "First Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_name", {
        header: "Last Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("phone_number", {
        header: "Phone Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("mr_number", {
        header: "MR Number",
        cell: (info) => info.getValue() ?? "N/A",
      }),
      columnHelper.accessor("createdAt", {
        header: "Registered Date",
        cell: (info) => <FormattedDateCell date={info.getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: (props) => (
          <ActionButtons registrationId={props.row.original.registration_id} />
        ),
      }),
    ],
    [] // No external dependencies needed for column definitions themselves
  );

  // useReactTable hook
  const table = useReactTable({
    data: registrations,
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
      <Flex mb="3">
        <TextField.Root
          placeholder="Search registrations..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ maxWidth: 300 }}
        />
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
                No registrations found {globalFilter && "matching your search"}.
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

export default RegistrationsTable;
