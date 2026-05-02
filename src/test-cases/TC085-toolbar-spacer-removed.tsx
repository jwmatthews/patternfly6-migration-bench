import React from "react";
import { Button, Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

export const TC085_ToolbarSpacerRemoved: React.FC = () => (
  <Toolbar>
    <ToolbarContent>
      <ToolbarGroup spacer={{ default: "spacerLg" }}>
        <ToolbarItem spacer={{ default: "spacerMd" }}>
          <Button>Action 1</Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button>Action 2</Button>
        </ToolbarItem>
      </ToolbarGroup>
    </ToolbarContent>
  </Toolbar>
);
