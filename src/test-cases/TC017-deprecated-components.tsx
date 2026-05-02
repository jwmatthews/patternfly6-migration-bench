import React from "react";
import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core/deprecated";

export const TC017_DeprecatedComponents: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dropdown
      isOpen={isOpen}
      toggle={<DropdownToggle onToggle={() => setIsOpen(!isOpen)}>Dropdown</DropdownToggle>}
      dropdownItems={[
        <DropdownItem key="item1">Item 1</DropdownItem>,
        <DropdownItem key="item2">Item 2</DropdownItem>,
      ]}
    />
  );
};
