import React from "react";
// In PF5, the next DualListSelector was at @patternfly/react-core/next
// This test case verifies import path migration
import { DualListSelector, DualListSelectorPane, DualListSelectorList, DualListSelectorListItem, DualListSelectorControlsWrapper, DualListSelectorControl } from "@patternfly/react-core";

export const TC024_DualListSelectorNext: React.FC = () => (
  <DualListSelector hasAnimations={true}>
    <DualListSelectorPane title="Available">
      <DualListSelectorList>
        <DualListSelectorListItem>Alpha</DualListSelectorListItem>
        <DualListSelectorListItem>Beta</DualListSelectorListItem>
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
