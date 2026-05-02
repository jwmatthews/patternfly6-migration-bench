import React from "react";
import { JumpLinks, JumpLinksItem } from "@patternfly/react-core";

export const TC035_JumpLinksItemMarkup: React.FC = () => (
  <JumpLinks>
    <JumpLinksItem href="#section-a" onClick={(e) => { e.preventDefault(); }}>
      Section A
    </JumpLinksItem>
  </JumpLinks>
);
