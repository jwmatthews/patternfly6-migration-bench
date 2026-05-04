import React from "react";
// Stubs for deprecated components that no longer exist in PF6
const Dropdown = (props: any) => <div>Deprecated Dropdown</div>;
const KebabToggle = (props: any) => <button>Deprecated KebabToggle</button>;

export const TC036_KebabToggleRemoved: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dropdown
      isOpen={isOpen}
      isPlain
      toggle={<KebabToggle onToggle={() => setIsOpen(!isOpen)} />}
      dropdownItems={[]}
    />
  );
};
