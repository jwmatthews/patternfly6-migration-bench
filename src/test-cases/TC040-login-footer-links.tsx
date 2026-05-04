import React from "react";
import { LoginFooterItem } from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export const TC040_LoginFooterLinks: React.FC = () => (
  <LoginFooterItem href="https://example.com" target="_blank" aria-label="Help link">
    <ExternalLinkAltIcon />
  </LoginFooterItem>
);
