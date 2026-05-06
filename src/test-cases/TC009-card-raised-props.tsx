import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core";

export const TC009_CardRaisedProps: React.FC = () => (
  <Card isSelectable>
    <CardHeader
      selectableActions={{
        selectableActionAriaLabel: "Select card",
        onChange: () => {},
        name: "tc009-selectable-card",
        selectableActionId: "tc009-selectable-input",
      }}
    />
    <CardTitle>Selectable Card</CardTitle>
    <CardBody>Card content</CardBody>
  </Card>
);
