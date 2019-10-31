import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ModalRootProvider } from "context-react-modal";

const req = require.context("../src", true, /\.stories\.js$/);

addDecorator(storyFn => <ModalRootProvider>{storyFn()}</ModalRootProvider>);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
