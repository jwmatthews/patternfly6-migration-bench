import React from "react";
// In PF5, the next DualListSelector was at @patternfly/react-core/next
// In PF6, the deprecated DualListSelector with availableOptions/chosenOptions props
// is at @patternfly/react-core/deprecated
import { DualListSelector } from "@patternfly/react-core/deprecated";

export const TC024_DualListSelectorNext: React.FC = () => (
  <DualListSelector
    availableOptions={["Alpha", "Beta"]}
    chosenOptions={["Gamma"]}
  />
);
