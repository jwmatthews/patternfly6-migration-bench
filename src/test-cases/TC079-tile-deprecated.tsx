import React from "react";
import {
	Tile
} from '@patternfly/react-core/deprecated';

export const TC079_TileDeprecated: React.FC = () => (
  <div>
    <Tile title="Tile 1" isSelected>Content 1</Tile>
    <Tile title="Tile 2">Content 2</Tile>
  </div>
);
