import React from "react";
import { Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent, DrawerSection } from "@patternfly/react-core";

export const TC020_DrawerColorVariant: React.FC = () => (
  <Drawer isExpanded>
    <DrawerContent colorVariant="secondary">
      <DrawerContentBody>Main content</DrawerContentBody>
    </DrawerContent>
    <DrawerPanelContent colorVariant="secondary">
      <DrawerSection colorVariant="secondary">Panel content</DrawerSection>
    </DrawerPanelContent>
  </Drawer>
);
