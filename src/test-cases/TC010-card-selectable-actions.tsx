import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core";

export const TC010_CardSelectableActions: React.FC = () => (
  <Card>
    <CardHeader selectableActions={{ selectableActionId: "card-action", to: "#", name: "card-link" }} />
    <CardTitle>Clickable Card</CardTitle>
    <CardBody>Card content</CardBody>
  </Card>
);
