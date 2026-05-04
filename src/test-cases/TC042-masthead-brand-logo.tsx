import React from "react";
import { Brand, Masthead, MastheadLogo, MastheadBrand, MastheadContent } from "@patternfly/react-core";

export const TC042_MastheadBrandLogo: React.FC = () => (
  <Masthead>
    <MastheadBrand data-codemods><MastheadLogo data-codemods>
      <Brand src="/logo.svg" alt="Logo" />
    </MastheadLogo></MastheadBrand>
    <MastheadContent>Header content</MastheadContent>
  </Masthead>
);
