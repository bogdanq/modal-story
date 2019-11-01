import React from "react";
import { Button } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { ModalContext, Modal } from "context-react-modal";
import { propTypes } from "../options/props-config";

const ModalForAnimation = ({ animationName, ...params }) => {
  return (
    <Modal animationName={animationName} {...params}>
      {({ closeModal }) => (
        <div>
          <h1>Modal with animation - {animationName}</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
          <Button onClick={closeModal}>×</Button>
        </div>
      )}
    </Modal>
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

const RootComponent = () => {
  const { showModal } = React.useContext(ModalContext);

  return (
    <>
      {modalNames.map(animation => (
        <Button
          onClick={() =>
            showModal(params => (
              <ModalForAnimation {...params} animationName={animation} />
            ))
          }
        >
          open modal ({animation})
        </Button>
      ))}
    </>
  );
};

RootComponent.__docgenInfo = {
  props: {
    ...propTypes,
    animationName: {
      type: {
        name: modalNames.map(name => `${name}, `),
      },
      required: false,
      description: "animation name",
    },
  },
};

RootComponent.defaultProps = {
  animationName: "translate",
};

storiesOf("Modals", module).add(
  "modal with animation",
  withInfo({
    inline: true,
  })(() => <RootComponent />),
  {
    info: {
      propTables: null,
      text: `
        #### - Usage 
        ~~~jsx
        const RootComponent = ({ animationName }) => {
          const { showModal } = React.useContext(ModalContext);
          return (
            <Button
              onClick={() =>
                showModal(params => (
                  <ModalForAnimation {...params} animationName={animationName} />
                ))
              }
            >
              open modal ({animation})
            </Button>
          )
        };
        ~~~
        #### - You can use your custom Modal wrapper - component (ModalForAnimation)
        ~~~jsx
        const ModalForAnimation = ({ animationName, ...params }) => {
          return (
            <Modal animationName={animationName} {...params}>
              {({ closeModal }) => (
                <div>
                  <h1>Modal with animation - {animationName}</h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit.
                  <Button onClick={closeModal}>Close</Button>
                </div>
              )}
            </Modal>
          );
        };        
        ~~~
        `,
    },
  },
);
