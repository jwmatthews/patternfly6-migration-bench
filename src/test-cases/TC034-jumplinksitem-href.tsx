import React from "react";
import { JumpLinks, JumpLinksItem } from "@patternfly/react-core";

export const TC034_JumpLinksItemHref: React.FC = () => (
  <JumpLinks>
    {/* @ts-expect-error - href is now required in PF6 */}
    <JumpLinksItem>Section 1</JumpLinksItem>
    <JumpLinksItem href="#section-2">Section 2</JumpLinksItem>
  </JumpLinks>
);
