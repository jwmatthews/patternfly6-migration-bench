import React from "react";
import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateHeader } from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";

export const TC026_EmptyStateExports: React.FC = () => (
  <EmptyState>
    <EmptyStateHeader titleText="Empty" headingLevel="h2" icon={<EmptyStateIcon icon={CubesIcon} />} />
    <EmptyStateBody>No data available</EmptyStateBody>
  </EmptyState>
);
