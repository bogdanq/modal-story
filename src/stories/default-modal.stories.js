import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { ModalContext, Modal } from "context-react-modal";
import { propTypes } from "../options/props-config";

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

DefaultModal.__docgenInfo = {
  props: propTypes,
};

DefaultModal.defaultProps = {};

storiesOf("Modals", module).add(
  "default modal",
  withInfo({
    inline: true,
  })(() => <DefaultModal />),
  {
    info: {
      propTables: null,
      text: `
        #### - Usage
        ~~~jsx
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
        ~~~
        `,
    },
  },
);
