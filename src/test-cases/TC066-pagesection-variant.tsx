import React from "react";
import { PageSection } from "@patternfly/react-core";

export const TC066_PageSectionVariant: React.FC = () => (
  <div>
    <PageSection hasBodyWrapper={false} >Light section</PageSection>
    <PageSection hasBodyWrapper={false} >Dark section</PageSection>
    <PageSection hasBodyWrapper={false} >Darker section</PageSection>
  </div>
);
