import React from "react";
import { t_global_spacer_md, t_temp_dev_tbd as global_Color_dark_100 /* CODEMODS: you should update this color token */ } from "@patternfly/react-tokens";

export const TC080_TokensPrefix: React.FC = () => (
  <div style={{ padding: t_global_spacer_md.value, color: global_Color_dark_100.value }}>
    Content using PF5 token values
  </div>
);
