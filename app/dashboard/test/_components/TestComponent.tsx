"use client";
import React from "react";
import { Select, Table } from "@radix-ui/themes";

const DrugsArray = [
  { id: 1, name: "Nexum A", dosage: "100mg" },
  { id: 2, name: "Ruling B", dosage: "200mg" },
  { id: 3, name: "Teph C", dosage: "300mg" },
  { id: 4, name: "NovoTeph D", dosage: "400mg" },
  { id: 5, name: "Dexoo E", dosage: "500mg" },
  { id: 6, name: "Protium F", dosage: "600mg" },
  { id: 7, name: "Etipro G", dosage: "700mg" },
];

const TestComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredDrugs, setFilteredDrugs] = React.useState(DrugsArray);

  React.useEffect(() => {
    const filtered = DrugsArray.filter((drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrugs(filtered);
  }, [searchTerm]);

  return (
    <>
      <div>TestComponent</div>
      <input
        title="text"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select.Root>
        <Select.Trigger>
          {filteredDrugs[0].name || "Choose one from list"}
        </Select.Trigger>
        <Select.Content>
          {filteredDrugs.map((drug) => (
            <Select.Item key={drug.id} value={drug.name}>
              {drug.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Table.Root>
        <Table.Body>
          {filteredDrugs.map((drug) => (
            <Table.Row key={drug.id}>
              <Table.Cell>{drug.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TestComponent;
