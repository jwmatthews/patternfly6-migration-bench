import React from "react";
import { MultipleFileUpload, MultipleFileUploadMain } from "@patternfly/react-core";

// SimpleFileUpload doesn't exist in PF5 - using MultipleFileUpload as similar component
export const TC071_SimpleFileUploadAria: React.FC = () => (
  <MultipleFileUpload>
    <MultipleFileUploadMain
      titleText="Upload file"
      titleTextSeparator="or"
      infoText="Drag and drop files here or browse"
    />
  </MultipleFileUpload>
);
