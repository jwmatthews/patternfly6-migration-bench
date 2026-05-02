import React from "react";
import { Text, TextContent, TextList, TextListItem, TextVariants } from "@patternfly/react-core";

export const TC077_TextToContent: React.FC = () => (
  <TextContent>
    <Text component={TextVariants.h1}>Heading</Text>
    <Text component={TextVariants.p}>Paragraph text</Text>
    <TextList>
      <TextListItem>Item 1</TextListItem>
      <TextListItem>Item 2</TextListItem>
    </TextList>
  </TextContent>
);
