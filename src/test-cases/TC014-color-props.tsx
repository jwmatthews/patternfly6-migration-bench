import React from "react";
import { Banner, Label } from "@patternfly/react-core";

export const TC014_ColorProps: React.FC = () => (
  <div>
    <Banner color="cyan">Cyan banner</Banner>
    <Banner color="gold">Gold banner</Banner>
    <Label color="teal">Cyan label</Label>
    <Label color="yellow">Gold label</Label>
  </div>
);
