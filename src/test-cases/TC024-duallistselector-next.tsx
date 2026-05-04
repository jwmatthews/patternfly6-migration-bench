import React from "react";
// In PF5, the next DualListSelector was at @patternfly/react-core/next
// This test case verifies import path migration
import {
	DualListSelector
} from '@patternfly/react-core/deprecated';

export const TC024_DualListSelectorNext: React.FC = () => (
  <DualListSelector
    availableOptions={["Alpha", "Beta"]}
    chosenOptions={["Gamma"]}
  />
);
