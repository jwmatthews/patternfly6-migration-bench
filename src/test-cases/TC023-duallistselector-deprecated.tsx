import React from "react";
import { DualListSelector } from "@patternfly/react-core/deprecated";

export const TC023_DualListSelectorDeprecated: React.FC = () => (
  <DualListSelector
    availableOptions={["Option 1", "Option 2", "Option 3"]}
    chosenOptions={["Option 4"]}
  />
);
