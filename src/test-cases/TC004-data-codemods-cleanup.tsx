import React from "react";
import { Button } from "@patternfly/react-core";

export const TC004_DataCodemodsCleanup: React.FC = () => (
  <div>
    <Button data-codemods="true">Click me</Button>
    <span data-codemods="true">Some text</span>
  </div>
);
