import React from "react";
import { Menu, MenuItem, MenuItemAction, MenuList } from "@patternfly/react-core";
import { BellIcon } from "@patternfly/react-icons";

export const TC045_MenuItemActionMarkup: React.FC = () => (
  <Menu>
    <MenuList>
      <MenuItem
        actions={<MenuItemAction icon={<BellIcon />} actionId="alert" aria-label="Alert" />}
      >
        Menu item with action
      </MenuItem>
    </MenuList>
  </Menu>
);
