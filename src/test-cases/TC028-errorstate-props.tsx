import React from "react";
import { ErrorState } from "@patternfly/react-component-groups";

export const TC028_ErrorStateProps: React.FC = () => (
  <ErrorState titleText="Something went wrong" bodyText="An unexpected error occurred. Please try again." />
);
