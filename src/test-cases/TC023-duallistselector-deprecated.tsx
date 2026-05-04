import React from "react";
import { DualListSelector, DualListSelectorPane, DualListSelectorList, DualListSelectorListItem, DualListSelectorControlsWrapper, DualListSelectorControl } from "@patternfly/react-core";

export const TC023_DualListSelectorDeprecated: React.FC = () => (
  <DualListSelector hasAnimations={true}>
    <DualListSelectorPane title="Available">
      <DualListSelectorList>
        <DualListSelectorListItem>Option 1</DualListSelectorListItem>
        <DualListSelectorListItem>Option 2</DualListSelectorListItem>
        <DualListSelectorListItem>Option 3</DualListSelectorListItem>
      </DualListSelectorList>
    </DualListSelectorPane>
    <DualListSelectorControlsWrapper>
      <DualListSelectorControl isDisabled />
      <DualListSelectorControl isDisabled />
    </DualListSelectorControlsWrapper>
    <DualListSelectorPane title="Chosen" isChosen>
      <DualListSelectorList />
    </DualListSelectorPane>
  </DualListSelector>
);
