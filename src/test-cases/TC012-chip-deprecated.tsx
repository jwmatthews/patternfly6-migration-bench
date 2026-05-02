import React from "react";
import { Chip, ChipGroup } from "@patternfly/react-core";

export const TC012_ChipDeprecated: React.FC = () => (
  <ChipGroup categoryName="Fruits">
    <Chip>Apple</Chip>
    <Chip>Banana</Chip>
    <Chip>Orange</Chip>
  </ChipGroup>
);
