"use client";
import { Admission_Discharge } from "@/generated/prisma";
import { DataList, Flex } from "@radix-ui/themes";
import { dateDDMMMYY } from "../../_components/appConstants";

interface Props {
  admissionDischarge: Admission_Discharge;
}
const DischargeHeader = ({
  admissionDischarge: {
    admission_date,
    admission_mode,
    discharge_date,
    discharge_mode,
  },
}: Props) => {
  return (
    <Flex
      justify="between"
      className="w-full bg-gray-50 p-4 dark:bg-transparent"
    >
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Admission Date</DataList.Label>
          <DataList.Value>{dateDDMMMYY(admission_date)}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Admission Mode</DataList.Label>
          <DataList.Value>{admission_mode?.toUpperCase()}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Discharge Date</DataList.Label>
          <DataList.Value>{dateDDMMMYY(discharge_date)}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Discharge Mode</DataList.Label>
          <DataList.Value>{discharge_mode?.toUpperCase()}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Flex>
  );
};

export default DischargeHeader;
