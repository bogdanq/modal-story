import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { ModalContext, Modal } from "context-react-modal";

const DefaultModal = () => {
  const { showModal } = React.useContext(ModalContext);

  return (
    <Button
      onClick={() =>
        showModal(params => <Modal {...params}>{() => <>Some modal</>}</Modal>)
      }
    >
      open modal
    </Button>
  );
};

storiesOf("Modals", module).add("default modal", () => <DefaultModal />);
