import React from "react";
import { Tab, TabTitleText, Tabs } from "@patternfly/react-core";

export const TC076_TabsScrollMarkup: React.FC = () => (
  <Tabs isBox activeKey={0}>
    {Array.from({ length: 20 }, (_, i) => (
      <Tab key={i} eventKey={i} title={<TabTitleText>Tab {i + 1}</TabTitleText>}>
        Content {i + 1}
      </Tab>
    ))}
  </Tabs>
);
