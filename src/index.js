import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BackendProvider } from "./FakeBackend";

ReactDOM.render(
  <React.StrictMode>
    <BackendProvider>
      <App />
    </BackendProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
