import { Box, Flex, Table } from "@radix-ui/themes";

const ConsultationPageSkeleton = () => {
  // Simulate a few rows for the table skeleton
  const skeletonRows = Array.from({ length: 7 }); // Adjust row count as needed

  return (
    <Box className="animate-pulse">
      {/* Skeleton for Search Input */}
      <Flex mb="3">
        <Box className="h-8 w-64 bg-gray-200 rounded">&nbsp;</Box>
      </Flex>

      {/* Skeleton for the Table */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {/* Adjust number and width of columns based on your actual ConsultationsTable */}
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-1/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-2/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-1/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-1/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-2/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-1/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-3/12">
              &nbsp;
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="h-10 bg-gray-200 rounded w-1/12">
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

      {/* Skeleton for Pagination Controls */}
      <Flex align="center" justify="between" mt="4" gap="3">
        {/* Page Info Text */}
        <Box className="h-5 w-48 bg-gray-200 rounded">&nbsp;</Box>

        {/* Navigation Buttons */}
        <Flex gap="1">
          <Box className="h-7 w-8 bg-gray-200 rounded">&nbsp;</Box>
          <Box className="h-7 w-24 bg-gray-200 rounded">&nbsp;</Box>
          <Box className="h-7 w-20 bg-gray-200 rounded">&nbsp;</Box>
          <Box className="h-7 w-8 bg-gray-200 rounded">&nbsp;</Box>
        </Flex>

        {/* Page Size Selector */}
        <Box className="h-7 w-28 bg-gray-200 rounded">&nbsp;</Box>
      </Flex>
    </Box>
  );
};

export default ConsultationPageSkeleton;
