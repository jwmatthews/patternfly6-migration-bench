import React from "react";
import { MultipleFileUpload, MultipleFileUploadMain } from "@patternfly/react-core";
export const TC071_SimpleFileUploadAria: React.FC = () => (
  <MultipleFileUpload>
    <MultipleFileUploadMain
      titleText="Upload file"
      titleTextSeparator="or"
      infoText="Drag and drop files here or browse"
    />
  </MultipleFileUpload>
);
