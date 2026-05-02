import React from "react";
import { InvalidObject } from "@patternfly/react-component-groups";

export const TC033_InvalidObjectProps: React.FC = () => (
  <InvalidObject
    invalidObjectTitleText="Page not found"
    invalidObjectBodyText="The requested page could not be found."
  />
);
