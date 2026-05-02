import React from "react";
import { global_spacer_md, global_Color_dark_100 } from "@patternfly/react-tokens";

export const TC080_TokensPrefix: React.FC = () => (
  <div style={{ padding: global_spacer_md.value, color: global_Color_dark_100.value }}>
    Content using PF5 token values
  </div>
);
