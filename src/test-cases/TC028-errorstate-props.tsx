import React from "react";
import { ErrorState } from "@patternfly/react-component-groups";

export const TC028_ErrorStateProps: React.FC = () => (
  <ErrorState errorTitle="Something went wrong" errorDescription="An unexpected error occurred. Please try again." />
);
