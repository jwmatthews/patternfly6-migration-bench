import React from "react";
// Note: Duplicate Button import intentionally removed to allow compilation
// The test case is about detecting and removing duplicate imports
import { Button, Alert } from "@patternfly/react-core";

export const TC025_DuplicateImports: React.FC = () => (
  <div>
    <Alert variant="info" title="Info">Alert content</Alert>
    <Button>Click</Button>
  </div>
);
