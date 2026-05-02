import React from "react";
import { Card, CardBody, CardTitle } from "@patternfly/react-core";

export const TC009_CardRaisedProps: React.FC = () => (
  <Card isSelectableRaised hasSelectableInput selectableInputAriaLabel="Select card" onSelectableInputChange={() => {}}>
    <CardTitle>Selectable Card</CardTitle>
    <CardBody>Card content</CardBody>
  </Card>
);
