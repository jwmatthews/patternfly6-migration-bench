import React from "react";
import { DualListSelector } from "@patternfly/react-core";

export const TC024_DualListSelectorNext: React.FC = () => (
  <DualListSelector
    availableOptions={["Alpha", "Beta"]}
    chosenOptions={["Gamma"]}
  />
);
