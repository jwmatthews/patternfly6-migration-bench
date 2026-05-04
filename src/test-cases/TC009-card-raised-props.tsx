import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core";

export const TC009_CardRaisedProps: React.FC = () => (
  <Card isSelectable>
    <CardHeader
      selectableActions={{
        onChange: () => {},
        selectableActionAriaLabel: "Select card",
      }}
    />
    <CardTitle>Selectable Card</CardTitle>
    <CardBody>Card content</CardBody>
  </Card>
);
