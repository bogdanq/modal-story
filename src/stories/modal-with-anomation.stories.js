import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { ModalContext, Modal } from "context-react-modal";

const ModalForAnimate = ({ animationName, ...params }) => {
  return (
    <>
      <Modal animationName={animationName} {...params}>
        {({ closeModal }) => (
          <div>
            <h1>Модалка с анимацией - {animationName}</h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            consectetur euismod erat. Sed imperdiet sollicitudin urna non
            sollicitudin. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Nullam id tristique tortor. In sodales augue sed lectus
            congue ullamcorper. Integer sit amet nisl tellus. Nam in condimentum
            nibh.
            <Button onClick={closeModal}>×</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

const modalNames = [
  "scale",
  "translate",
  "rotate",
  "jackIn",
  "rubber",
  "swing",
  "rollin",
];

const Component = () => {
  const { showModal } = React.useContext(ModalContext);

  return modalNames.map(animation => (
    <Button
      onClick={() =>
        showModal(params => (
          <ModalForAnimate {...params} animationName={animation} />
        ))
      }
    >
      open modal ({animation})
    </Button>
  ));
};

storiesOf("Modals", module).add("modal with animation", () => <Component />);
