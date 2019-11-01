import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { ModalContext, Modal } from "context-react-modal";
import { css, keyframes } from "styled-components";

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;

const scaleOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1)
  }
  100% {
    opacity: 0.5;
    transform: scale(0.5)
  }
`;

const rollinIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const animationCustomStyle = {
  rollin: css`
    border: 1px solid red;
    animation-name: ${({ isAnimated }) => (isAnimated ? zoomIn : scaleOut)};
  `,
  zoom: css`
    border: 1px solid red;
    animation-name: ${({ isAnimated }) => (isAnimated ? rollinIn : scaleOut)};
  `,
};

const ModalForCustomAnimate = ({ customAnimationName, ...params }) => {
  return (
    <>
      <Modal
        customAnimation={animationCustomStyle[customAnimationName]}
        {...params}
      >
        {({ closeModal }) => (
          <div>
            <h1>Модалка с анимацией - {customAnimationName}</h1>
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

const Component = () => {
  const { showModal } = React.useContext(ModalContext);
  const [modalNames] = React.useState(["rollin", "zoom"]);

  return (
    <>
      {modalNames.map(animation => (
        <Button
          onClick={() =>
            showModal(params => (
              <ModalForCustomAnimate
                {...params}
                customAnimationName={animation}
              />
            ))
          }
        >
          open modal ({animation})
        </Button>
      ))}
    </>
  );
};

storiesOf("Modals", module).add("modal with custom animations", () => (
  <Component />
));
