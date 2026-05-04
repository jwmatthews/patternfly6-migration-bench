import React from "react";
import { LoginMainFooterLinksItem, Button } from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export const TC040_LoginFooterLinks: React.FC = () => (
  <LoginMainFooterLinksItem data-codemods="true"    ><Button icon={<ExternalLinkAltIcon />} variant="link" component="a" href="https://example.com" target="_blank" {...{ "aria-label": "Help link" }}>
    
  </Button></LoginMainFooterLinksItem>
);
