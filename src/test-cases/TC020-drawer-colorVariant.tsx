import React from "react";
import { Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent, DrawerSection } from "@patternfly/react-core";

export const TC020_DrawerColorVariant: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent
      colorVariant="light-200"
      panelContent={
        <DrawerPanelContent colorVariant="light-200">
          <DrawerSection colorVariant="light-200">Panel content</DrawerSection>
        </DrawerPanelContent>
      }
    >
      <DrawerContentBody>Main content</DrawerContentBody>
    </DrawerContent>
  </Drawer>
);
