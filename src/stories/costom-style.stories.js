import React from "react";
import { Button } from "@storybook/react/demo";
import styled, { css } from "styled-components";
import { ModalContext, Modal } from "context-react-modal";
import { storiesOf } from "@storybook/react";

const customStyle = css`
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

export const ModalForCustomStyle = ({ ...params }) => {
  return (
    <>
      <Modal {...params} style={customStyle}>
        {({ closeModal }) => (
          <>
            <Header>Модальное с кастомными стилями</Header>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              consectetur euismod erat. Sed imperdiet sollicitudin urna non
              sollicitudin. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Nullam id tristique tortor. In sodales augue sed lectus
              congue ullamcorper. Integer sit amet nisl tellus. Nam in
              condimentum nibh.
            </Text>
            <ButtonStyle onClick={closeModal}>×</ButtonStyle>
          </>
        )}
      </Modal>
    </>
  );
};

const Component = () => {
  const { showModal } = React.useContext(ModalContext);

  return (
    <Button
      onClick={() => showModal(params => <ModalForCustomStyle {...params} />)}
    >
      open modal
    </Button>
  );
};

storiesOf("Modals", module).add("custom modal style", () => <Component />);

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
