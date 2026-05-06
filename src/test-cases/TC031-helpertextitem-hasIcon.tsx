import React from "react";
import { HelperText, HelperTextItem } from "@patternfly/react-core";

export const TC031_HelperTextItemHasIcon: React.FC = () => (
  <HelperText>
    <HelperTextItem isDynamic variant="success">
      Validation passed
    </HelperTextItem>
    <HelperTextItem isDynamic variant="error">
      Validation failed
    </HelperTextItem>
  </HelperText>
);
