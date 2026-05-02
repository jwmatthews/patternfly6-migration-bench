import React from "react";
import { Nav, NavItem, NavList, Page, PageSection } from "@patternfly/react-core";

export const TC061_PageBodyWrapper: React.FC = () => (
  <Page breadcrumb={<div>Home / Page</div>}>
    <PageSection>Content</PageSection>
  </Page>
);
