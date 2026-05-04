import React from "react";
import { EmptyState, EmptyStateBody,  } from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { Title } from "@patternfly/react-core";

export const TC027_EmptyStateHeader: React.FC = () => (
  <EmptyState titleText={<Title headingLevel="h2" size="lg">No results found</Title>} icon={SearchIcon}>
    <EmptyStateBody>Try adjusting your search.</EmptyStateBody>
  </EmptyState>
);
