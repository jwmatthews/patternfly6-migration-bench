import React from "react";
import { FormGroup, TextInput } from "@patternfly/react-core";

// This tests the interface typo fix: FormFiledGroupHeaderTitleTextObject -> FormFieldGroupHeaderTitleTextObject
// The actual interface usage would be in TypeScript type annotations
export const TC029_FormFieldTypo: React.FC = () => (
  <FormGroup label="Name">
    <TextInput id="tc029-input" />
  </FormGroup>
);
