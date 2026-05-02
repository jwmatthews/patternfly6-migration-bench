import React from "react";
import { Slider } from "@patternfly/react-core";
import "./TC072-slider-css-variable.css";

export const TC072_SliderCssVariable: React.FC = () => (
  <div className="custom-slider">
    <Slider value={50} />
  </div>
);
