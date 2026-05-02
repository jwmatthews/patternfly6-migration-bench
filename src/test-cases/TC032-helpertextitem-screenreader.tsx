import React from "react";
import { HelperText, HelperTextItem } from "@patternfly/react-core";

export const TC032_HelperTextItemScreenReader: React.FC = () => (
  <HelperText>
    <HelperTextItem variant="default" screenReaderText="Default helper text:">
      This is default helper text with screenReaderText
    </HelperTextItem>
    <HelperTextItem variant="error" screenReaderText="Error:">
      This field has an error
    </HelperTextItem>
  </HelperText>
);
