import React from "react";
import { EmptyState, EmptyStateBody } from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";

export const TC027_EmptyStateHeader: React.FC = () => (
  <EmptyState icon={SearchIcon} headingLevel="h2" titleText="No results found">
    <EmptyStateBody>Try adjusting your search.</EmptyStateBody>
  </EmptyState>
);
