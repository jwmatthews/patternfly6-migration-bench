import React from "react";
import { PageSection } from "@patternfly/react-core";

export const TC067_PageSectionVariantType: React.FC = () => (
  <PageSection hasBodyWrapper={false}  type="wizard">
    Section with variant and non-default type
  </PageSection>
);
