import React from "react";
import { MultiContentCard } from "@patternfly/react-component-groups";
import { Card, CardBody } from "@patternfly/react-core";

export const TC050_MultiContentCardProps: React.FC = () => (
  <MultiContentCard
    leftBorderVariant="danger"
    withHeaderBorder
    cards={[
      <Card><CardBody>Card 1</CardBody></Card>,
    ]}
  />
);
