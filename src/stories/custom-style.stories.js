import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import styled, { css } from "styled-components";
import { ModalContext, Modal } from "context-react-modal";
import { propTypes } from "../options/props-config";

const style = css`
  background: #fff;
  width: 500px;
  border-radius: inherit;
  font-size: 1rem;
  padding: 0;
  padding-bottom: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const ModalForCustomStyle = ({ customStyle, ...params }) => {
  return (
    <Modal {...params} style={customStyle}>
      {({ closeModal }) => (
        <>
          <Header>Modal with custom style</Header>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            consectetur euismod erat. Sed imperdiet sollicitudin urna non.
          </Text>
          <ButtonStyle onClick={closeModal}>×</ButtonStyle>
        </>
      )}
    </Modal>
  );
};

const SomeRootComponent = ({ customStyle }) => {
  const { showModal } = React.useContext(ModalContext);

  return (
    <Button
      onClick={() =>
        showModal(params => (
          <ModalForCustomStyle {...params} customStyle={style} />
        ))
      }
    >
      open modal style
    </Button>
  );
};

SomeRootComponent.__docgenInfo = {
  props: {
    ...propTypes,
    customStyle: {
      type: {
        name: "FlattenInterpolation (from styled)",
      },
      required: false,
      description: `your custom style. For example: \n css\`${style}\``,
    },
  },
};

SomeRootComponent.defaultProps = {};

storiesOf("Modals", module).add(
  "custom modal style",
  withInfo({
    inline: true,
  })(() => <SomeRootComponent customStyle={"your style"} />),
  {
    info: {
      propTables: null,
      text: `
        #### - Usage
        ~~~jsx
        const SomeRootComponent = () => {
          const { showModal } = React.useContext(ModalContext);
        
          return (
            <Button
              onClick={() => showModal(params => <ModalForCustomStyle {...params} />)}
            >
              open modal style
            </Button>
          );
        };
        ~~~
        #### - You can use your custom Modal wrapper - component (ModalForCustomStyle)
        ~~~jsx
        const ModalForCustomStyle = ({ ...params }) => {
          return (
            <Modal {...params} style={customStyle}>
              {({ closeModal }) => (
                <>
                  <Header>Modal with custom style</Header>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                    consectetur euismod erat. Sed imperdiet sollicitudin urna non.
                  </Text>
                  <Button onClick={closeModal}>Close</Button>
                </>
              )}
            </Modal>
          );
        };
        ~~~
      `,
    },
  },
);

export const ButtonStyle = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  padding: 0;
  overflow: hidden;
  border: none;
  border-radius: 0;
  outline: initial;
  background: 0 0;
  color: #ccc;
  font-family: serif;
  font-size: 2.5em;
  line-height: 1.2;
  cursor: pointer;
`;

export const Header = styled.div`
  background: #00c851;
  color: #fff;
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 25px;
`;

export const Text = styled.div`
  color: #616161;
  width: 90%;
  margin: 0 auto;
`;
