import React from "react";
import { ModalContext, Modal } from "context-react-modal";

function App() {
  const { showModal } = React.useContext(ModalContext);
  return (
    <div className="App">
      <button
        onClick={() =>
          showModal(params => <Modal {...params}>{() => <>somemodal</>}</Modal>)
        }
      >
        click me!
      </button>
    </div>
  );
}

export default App;
