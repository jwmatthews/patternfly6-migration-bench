import React from "react";
// PageHeaderToolsItem may not exist in PF5, simulating the removal case
export const TC063_PageHeaderToolsIsSelected: React.FC = () => (
  <div data-test-id="page-header-tools-item-placeholder">
    <span>Selected tool (PageHeaderToolsItem simulated)</span>
  </div>
);
