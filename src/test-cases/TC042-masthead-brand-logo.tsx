import React from "react";
import { Brand, Masthead, MastheadBrand, MastheadContent, MastheadLogo } from "@patternfly/react-core";

export const TC042_MastheadBrandLogo: React.FC = () => (
  <Masthead>
    <MastheadBrand>
      <MastheadLogo>
        <Brand src="/logo.svg" alt="Logo" />
      </MastheadLogo>
    </MastheadBrand>
    <MastheadContent>Header content</MastheadContent>
  </Masthead>
);
