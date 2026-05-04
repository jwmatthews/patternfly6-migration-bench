import React from "react";
import { Label, LabelGroup } from '@patternfly/react-core';

export const TC013_ChipToLabel: React.FC = () => (
  <LabelGroup categoryName="Colors">
    <Label variant="outline" onClose={() => {}}>Red</Label>
    <Label variant="outline" onClose={() => {}}>Blue</Label>
  </LabelGroup>
);
