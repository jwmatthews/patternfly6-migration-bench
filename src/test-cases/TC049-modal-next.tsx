import React from "react";
import { Button } from "@patternfly/react-core";
// In PF5, the next Modal implementation was accessed via /next path
import {
	Modal,
	ModalVariant
} from '@patternfly/react-core/deprecated';

export const TC049_ModalNext: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal variant={ModalVariant.small} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal">
        Content
      </Modal>
    </>
  );
};
