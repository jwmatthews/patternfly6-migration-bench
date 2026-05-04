import React from "react";
import { Banner } from "@patternfly/react-core";

// In PF5, Banner uses "variant" but with different values like "default", "blue", "red", "green", "gold"
// The test simulates code that would need migration to PF6's status prop
export const TC006_BannerVariant: React.FC = () => (
  <div>
    <Banner color="yellow">Warning banner</Banner>
    <Banner color="red">Danger banner</Banner>
    <Banner color="blue">Info banner</Banner>
    <Banner color="green">Success banner</Banner>
  </div>
);
