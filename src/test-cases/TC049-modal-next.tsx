import React from "react";
import { Button } from "@patternfly/react-core";
// In PF5, the next Modal implementation was accessed via /next path
import { Modal, ModalBody, ModalHeader, ModalVariant } from "@patternfly/react-core";

export const TC049_ModalNext: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal variant={ModalVariant.small} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader title="Modal" />
        <ModalBody>
          Content
        </ModalBody>
      </Modal>
    </>
  );
};
