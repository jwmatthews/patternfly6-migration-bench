import React from "react";
import { Nav, NavItem, NavList, Page, PageNavigation, PageSection } from "@patternfly/react-core";

export const TC064_PageNavigationRemoved: React.FC = () => (
  <Page>
    <PageNavigation>
      <Nav>
        <NavList>
          <NavItem to="#">Link</NavItem>
        </NavList>
      </Nav>
    </PageNavigation>
    <PageSection>Content</PageSection>
  </Page>
);
