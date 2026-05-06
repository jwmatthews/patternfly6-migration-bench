import React from "react";
import { Page, PageSection } from "@patternfly/react-core";

export const TC066_PageSectionVariant: React.FC = () => (
  <Page>
    <PageSection variant="secondary">Light section</PageSection>
    <PageSection variant="secondary">Dark section</PageSection>
    <PageSection variant="secondary">Darker section</PageSection>
  </Page>
);
