import React from "react";
import { Banner } from "@patternfly/react-core";

// In PF5, Banner uses "variant" but with different values like "default", "blue", "red", "green", "gold"
// The test simulates code that would need migration to PF6's status prop
export const TC006_BannerVariant: React.FC = () => (
  <div>
    <Banner>Warning banner</Banner>
    <Banner>Danger banner</Banner>
    <Banner>Info banner</Banner>
    <Banner>Success banner</Banner>
  </div>
);
