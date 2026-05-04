import React from "react";
// Stubs for deprecated components that no longer exist in PF6
const Dropdown = (props: any) => <div>Deprecated Dropdown</div>;
const DropdownItem = (props: any) => <div>Deprecated DropdownItem</div>;
const DropdownToggle = (props: any) => <button>Deprecated DropdownToggle</button>;

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
