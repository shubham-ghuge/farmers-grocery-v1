import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./contexts/useDataProvider";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <DataProvider>
        <App />
      </DataProvider>
    </Router>
  </StrictMode>,
  rootElement
);
