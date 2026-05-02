import React from "react";
import { NotificationDrawer, NotificationDrawerHeader } from "@patternfly/react-core";

export const TC056_NotificationDrawerHeader: React.FC = () => (
  <NotificationDrawer>
    <NotificationDrawerHeader title="Notifications" count={3} />
  </NotificationDrawer>
);
