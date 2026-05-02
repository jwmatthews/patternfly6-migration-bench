import React from "react";
import { Banner, Label } from "@patternfly/react-core";

export const TC014_ColorProps: React.FC = () => (
  <div>
    <Banner color="cyan">Cyan banner</Banner>
    <Banner color="gold">Gold banner</Banner>
    <Label color="cyan">Cyan label</Label>
    <Label color="gold">Gold label</Label>
  </div>
);
