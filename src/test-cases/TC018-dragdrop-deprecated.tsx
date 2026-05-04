import React from "react";
import { DragDropSort } from "@patternfly/react-drag-drop";

export const TC018_DragDropDeprecated: React.FC = () => (
  <DragDropSort
    items={[
      { id: "item-1", content: "Item 1" },
      { id: "item-2", content: "Item 2" },
    ]}
    onDrop={() => {}}
  />
);
