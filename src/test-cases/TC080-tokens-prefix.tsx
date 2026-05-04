import React from "react";
import { t_global_spacer_md, t_global_text_color_100 } from "@patternfly/react-tokens";

export const TC080_TokensPrefix: React.FC = () => (
  <div style={{ padding: t_global_spacer_md.value, color: t_global_text_color_100.value }}>
    Content using PF5 token values
  </div>
);
