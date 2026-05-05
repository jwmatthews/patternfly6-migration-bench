import React from "react";
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent } from "@patternfly/react-core";

export const TC022_DrawerHeadPanelBody: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent panelContent={
      <DrawerPanelContent>
        <DrawerHead>
          <span>Title inside DrawerHead</span>
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
