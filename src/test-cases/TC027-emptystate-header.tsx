import React from "react";
import { EmptyState, EmptyStateBody, EmptyStateIcon } from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { Title } from "@patternfly/react-core";

export const TC027_EmptyStateHeader: React.FC = () => (
  <EmptyState>
    <EmptyStateIcon icon={SearchIcon} />
    <Title headingLevel="h2" size="lg">No results found</Title>
    <EmptyStateBody>Try adjusting your search.</EmptyStateBody>
  </EmptyState>
);
