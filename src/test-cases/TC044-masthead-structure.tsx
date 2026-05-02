import React from "react";
import { Brand, Button, Masthead, MastheadBrand, MastheadContent, MastheadMain, MastheadToggle } from "@patternfly/react-core";
import { BarsIcon } from "@patternfly/react-icons";

export const TC044_MastheadStructure: React.FC = () => (
  <Masthead>
    <MastheadToggle>
      <Button variant="plain" aria-label="Toggle"><BarsIcon /></Button>
    </MastheadToggle>
    <MastheadMain>
      <MastheadBrand>
        <Brand src="/logo.svg" alt="Logo" />
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>Content</MastheadContent>
  </Masthead>
);
