import React from "react";
import { NotAuthorized } from "@patternfly/react-component-groups";

export const TC054_NotAuthorizedProps: React.FC = () => (
  <NotAuthorized
    title="Access denied"
    description="You do not have permission to view this page."
  />
);
