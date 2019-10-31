import React from "react";
import ReactDOM from "react-dom";
import { ModalRootProvider } from "context-react-modal";

import App from "./App";

ReactDOM.render(
  <ModalRootProvider>
    <App />
  </ModalRootProvider>,
  document.getElementById("root"),
);
