import React from "react";
import { Brand, Button, Masthead, MastheadLogo, MastheadContent, MastheadMain, MastheadToggle, MastheadBrand } from "@patternfly/react-core";
import { BarsIcon } from "@patternfly/react-icons";

export const TC044_MastheadStructure: React.FC = () => (
  <Masthead>
    
    <MastheadMain><MastheadToggle>
      <Button icon={<BarsIcon />} variant="plain" aria-label="Toggle" />
    </MastheadToggle>
      <MastheadBrand data-codemods><MastheadLogo data-codemods>
        <Brand src="/logo.svg" alt="Logo" />
      </MastheadLogo></MastheadBrand>
    </MastheadMain>
    <MastheadContent>Content</MastheadContent>
  </Masthead>
);
