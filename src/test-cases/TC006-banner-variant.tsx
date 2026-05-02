import React from "react";
import { Banner } from "@patternfly/react-core";

// In PF5, Banner uses "variant" but with different values like "default", "blue", "red", "green", "gold"
// The test simulates code that would need migration to PF6's status prop
export const TC006_BannerVariant: React.FC = () => (
  <div>
    <Banner variant="gold">Warning banner</Banner>
    <Banner variant="red">Danger banner</Banner>
    <Banner variant="blue">Info banner</Banner>
    <Banner variant="green">Success banner</Banner>
  </div>
);
