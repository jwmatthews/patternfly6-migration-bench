import React from "react";
import { MenuToggle, Select, SelectList, SelectOption } from "@patternfly/react-core";

export const TC070_PopperAppendTo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Select
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      onSelect={() => setIsOpen(false)}
      toggle={(toggleRef) => (
        <MenuToggle ref={toggleRef} onClick={() => setIsOpen(!isOpen)} isExpanded={isOpen}>
          Select
        </MenuToggle>
      )}
    >
      <SelectList>
        <SelectOption value="Option 1">Option 1</SelectOption>
        <SelectOption value="Option 2">Option 2</SelectOption>
      </SelectList>
    </Select>
  );
};
