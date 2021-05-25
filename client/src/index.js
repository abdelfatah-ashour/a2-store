import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./Context_API/AuthContext";
ReactDOM.render(
  <>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </>,
  document.getElementById("root")
);
