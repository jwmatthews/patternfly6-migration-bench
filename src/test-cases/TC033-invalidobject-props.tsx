import React from "react";
import { MissingPage } from "@patternfly/react-component-groups";

export const TC033_InvalidObjectProps: React.FC = () => (
  <MissingPage data-codemods
    titleText="Page not found"
    bodyText="The requested page could not be found."
  />
);
