import React from "react";
import { Chip, ChipGroup } from "@patternfly/react-core";

export const TC013_ChipToLabel: React.FC = () => (
  <ChipGroup categoryName="Colors">
    <Chip onClick={() => {}}>Red</Chip>
    <Chip onClick={() => {}}>Blue</Chip>
  </ChipGroup>
);
