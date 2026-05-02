import React from "react";
import { Brand, Masthead, MastheadBrand, MastheadContent } from "@patternfly/react-core";

export const TC042_MastheadBrandLogo: React.FC = () => (
  <Masthead>
    <MastheadBrand>
      <Brand src="/logo.svg" alt="Logo" />
    </MastheadBrand>
    <MastheadContent>Header content</MastheadContent>
  </Masthead>
);
