import React from "react";
import { Button } from "@patternfly/react-core";
import { TimesIcon, PlusCircleIcon } from "@patternfly/react-icons";

export const TC007_ButtonIconToProp: React.FC = () => (
  <div>
    <Button icon={<TimesIcon />} variant="plain" />
    <Button icon={<PlusCircleIcon />} variant="primary"> Add item</Button>
  </div>
);
