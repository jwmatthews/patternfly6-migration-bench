import React from "react";
import { DualListSelector } from "@patternfly/react-core";

export const TC023_DualListSelectorDeprecated: React.FC = () => (
  <DualListSelector
    availableOptions={["Option 1", "Option 2", "Option 3"]}
    hasAnimations={true}
  />
);
