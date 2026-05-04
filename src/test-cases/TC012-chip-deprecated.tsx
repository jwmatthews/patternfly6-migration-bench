import React from "react";
import { Label, LabelGroup } from '@patternfly/react-core';

export const TC012_ChipDeprecated: React.FC = () => (
  <LabelGroup categoryName="Fruits">
    <Label variant="outline">Apple</Label>
    <Label variant="outline">Banana</Label>
    <Label variant="outline">Orange</Label>
  </LabelGroup>
);
