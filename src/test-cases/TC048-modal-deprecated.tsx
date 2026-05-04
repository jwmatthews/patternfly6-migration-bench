import React from "react";
import {
	Button
} from '@patternfly/react-core';
import {
	Modal,
	ModalVariant
} from '@patternfly/react-core/deprecated';

export const TC048_ModalDeprecated: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal
        variant={ModalVariant.small}
        title="Modal title"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actions={[
          <Button key="confirm" variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>,
          <Button key="cancel" variant="link" onClick={() => setIsOpen(false)}>Cancel</Button>,
        ]}
      >
        Modal body content
      </Modal>
    </>
  );
};
