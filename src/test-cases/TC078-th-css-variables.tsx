import React from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import "./TC078-th-css-variables.css";

export const TC078_ThCssVariables: React.FC = () => (
  <Table aria-label="Sticky column table" className="custom-table">
    <Thead>
      <Tr>
        <Th isStickyColumn>Name</Th>
        <Th>Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td isStickyColumn>Row 1</Td>
        <Td>Data</Td>
      </Tr>
    </Tbody>
  </Table>
);
