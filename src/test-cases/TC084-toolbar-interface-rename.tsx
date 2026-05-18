import React from "react";
import { Toolbar, ToolbarContent, ToolbarFilter, ToolbarItem } from "@patternfly/react-core";
interface FilterCategory {
  key: string;
  name: string;
}

export const TC084_ToolbarInterfaceRename: React.FC = () => (
  <Toolbar>
    <ToolbarContent>
      <ToolbarItem>Toolbar with renamed interfaces</ToolbarItem>
    </ToolbarContent>
  </Toolbar>
);
