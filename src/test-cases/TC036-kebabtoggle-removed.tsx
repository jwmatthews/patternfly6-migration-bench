import React from "react";
import { Dropdown, KebabToggle } from "@patternfly/react-core/deprecated";

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
