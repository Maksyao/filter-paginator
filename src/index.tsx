import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import List from "./List";

render(
  <BrowserRouter>
    <Route component={List} />
  </BrowserRouter>,
  document.getElementById("root")
);
