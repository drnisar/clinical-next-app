// filepath: /Users/nisar/Desktop/workspace/clinical-next-app/app/dashboard/registration/_components/RegistrationPageSkeleton.tsx
import { Box, Button, Flex, Table } from "@radix-ui/themes";
import React from "react";

const RegistrationPageSkeleton = () => {
  // Simulate a few rows for the table skeleton
  const skeletonRows = Array.from({ length: 5 });

  return (
    <Box>
      {/* Skeleton for the Button */}
      <Flex justify="end" mb="4">
        <Button disabled className="w-36 h-8 bg-gray-200 animate-pulse rounded">
          &nbsp; {/* Non-breaking space for height */}
        </Button>
      </Flex>

      {/* Skeleton for the Table */}
      <Table.Root variant="surface" className="animate-pulse">
        <Table.Header>
          <Table.Row>
            {/* Adjust number of columns based on your actual table */}
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded">
              &nbsp;
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {skeletonRows.map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
              <Table.Cell className="h-10 bg-gray-100 rounded">
                &nbsp;
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default RegistrationPageSkeleton;
