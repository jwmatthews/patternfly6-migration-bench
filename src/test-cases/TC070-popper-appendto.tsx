import React from "react";
import { Select, SelectOption } from "@patternfly/react-core";

export const TC070_PopperAppendTo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Select
      variant="single"
      isOpen={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      onSelect={() => setIsOpen(false)}
    >
      <SelectOption value="Option 1" />
      <SelectOption value="Option 2" />
    </Select>
  );
};
