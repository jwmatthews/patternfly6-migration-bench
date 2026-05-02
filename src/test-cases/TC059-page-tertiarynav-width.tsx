import React from "react";
import { Page, PageSection } from "@patternfly/react-core";

export const TC059_PageTertiaryNavWidth: React.FC = () => (
  <Page isTertiaryNavWidthLimited>
    <PageSection>Content</PageSection>
  </Page>
);
