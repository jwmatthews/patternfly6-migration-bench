import React from "react";
import { Button } from "@patternfly/react-core";
import { TimesIcon, PlusCircleIcon } from "@patternfly/react-icons";

export const TC007_ButtonIconToProp: React.FC = () => (
  <div>
    <Button variant="plain"><TimesIcon /></Button>
    <Button variant="primary"><PlusCircleIcon /> Add item</Button>
  </div>
);
