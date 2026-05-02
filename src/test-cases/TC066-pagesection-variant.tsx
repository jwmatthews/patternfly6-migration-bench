import React from "react";
import { PageSection } from "@patternfly/react-core";

export const TC066_PageSectionVariant: React.FC = () => (
  <div>
    <PageSection variant="light">Light section</PageSection>
    <PageSection variant="dark">Dark section</PageSection>
    <PageSection variant="darker">Darker section</PageSection>
  </div>
);
