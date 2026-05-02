import React from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core/deprecated";

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
