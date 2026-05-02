import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";

export const TC052_NavTheme: React.FC = () => (
  <Nav theme="dark">
    <NavList>
      <NavItem to="#">Link 1</NavItem>
      <NavItem to="#">Link 2</NavItem>
    </NavList>
  </Nav>
);
