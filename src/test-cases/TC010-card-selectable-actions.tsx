import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core";

export const TC010_CardSelectableActions: React.FC = () => (
  <Card isClickable>
    <CardHeader selectableActions={{ selectableActionId: "card-action", to: "#", name: "card-link" }}>
      <CardTitle>Clickable Card</CardTitle>
    </CardHeader>
    <CardBody>Card content</CardBody>
  </Card>
);
