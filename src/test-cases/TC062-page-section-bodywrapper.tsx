import React from "react";
import { Page, PageSection } from "@patternfly/react-core";

export const TC062_PageSectionBodyWrapper: React.FC = () => (
  <Page>
    <PageSection hasBodyWrapper  isWidthLimited>
      Width-limited section
    </PageSection>
    <PageSection hasBodyWrapper={false}>Default section</PageSection>
  </Page>
);
