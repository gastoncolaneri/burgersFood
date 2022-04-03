import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FoodsProvider } from "./context/context";

ReactDOM.render(
  <FoodsProvider>
    <App />
  </FoodsProvider>,

  document.getElementById("root")
);
