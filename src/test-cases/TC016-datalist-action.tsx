import React from "react";
import { DataList, DataListAction, DataListCell, DataListItem, DataListItemCells, DataListItemRow, Button } from "@patternfly/react-core";

export const TC016_DataListAction: React.FC = () => (
  <DataList aria-label="data list">
    <DataListItem>
      <DataListItemRow>
        <DataListItemCells dataListCells={[<DataListCell key="cell">Cell</DataListCell>]} />
        <DataListAction id="action1" aria-label="actions" aria-labelledby="action1" >
          <Button icon="Action" variant="plain" />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  </DataList>
);
