import React from "react";
// Stubs for deprecated components that no longer exist in PF6
const Select = (props: any) => <div>Deprecated Select</div>;
const SelectOption = (props: any) => <div>Deprecated SelectOption</div>;
const SelectVariant = { single: "single" as const };

export const TC070_PopperAppendTo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Select
      variant={SelectVariant.single}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onSelect={() => setIsOpen(false)}
    >
      <SelectOption value="Option 1" />
      <SelectOption value="Option 2" />
    </Select>
  );
};
