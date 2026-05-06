import React from "react";
import { Banner, Label } from "@patternfly/react-core";

export const TC014_ColorProps: React.FC = () => (
  <div>
    <Banner color="teal">Cyan banner</Banner>
    <Banner color="yellow">Gold banner</Banner>
    <Label color="teal">Cyan label</Label>
    <Label color="yellow">Gold label</Label>
  </div>
);
