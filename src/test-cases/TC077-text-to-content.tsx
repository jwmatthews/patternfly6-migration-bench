import React from "react";
import { Content, ContentVariants } from "@patternfly/react-core";

export const TC077_TextToContent: React.FC = () => (
  <Content>
    <Content component={ContentVariants.h1}>Heading</Content>
    <Content component={ContentVariants.p}>Paragraph text</Content>
    <Content>
      <Content>Item 1</Content>
      <Content>Item 2</Content>
    </Content>
  </Content>
);
