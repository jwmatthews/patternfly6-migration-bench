import React from "react";
import { InvalidObject } from "@patternfly/react-component-groups";

export const TC047_MissingPage: React.FC = () => (
  <InvalidObject
    invalidObjectTitleText="Page not found"
    invalidObjectBodyText="The page you are looking for does not exist."
  />
);
