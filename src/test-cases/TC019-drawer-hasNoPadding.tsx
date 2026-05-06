import React from "react";
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent } from "@patternfly/react-core";

export const TC019_DrawerHasNoPadding: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent panelContent={
      <DrawerPanelContent>
        <DrawerHead>
          Panel header with no padding
          <DrawerActions>
            <DrawerCloseButton />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    }>
      <DrawerContentBody>Main content</DrawerContentBody>
    </DrawerContent>
  </Drawer>
);
