import React from "react";
import ReactDOM from "react-dom";

import Payroll from "./Payroll";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Payroll />
  </React.StrictMode>,
  rootElement
);
