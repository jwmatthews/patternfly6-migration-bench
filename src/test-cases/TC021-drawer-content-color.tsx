import React from "react";
import { Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent } from "@patternfly/react-core";

export const TC021_DrawerContentColor: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent>
      <DrawerContentBody>Main content</DrawerContentBody>
    </DrawerContent>
    <DrawerPanelContent>Panel</DrawerPanelContent>
  </Drawer>
);
