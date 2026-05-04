import React from "react";
import { Drawer, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent } from "@patternfly/react-core";

export const TC019_DrawerHasNoPadding: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent>
      <DrawerContentBody>Main content</DrawerContentBody>
    </DrawerContent>
    <DrawerPanelContent>
      <DrawerHead>
        Panel header with no padding
      </DrawerHead>
    </DrawerPanelContent>
  </Drawer>
);
