import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./contexts/useDataProvider";
import store from "./store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </Provider>
  </StrictMode>,
  rootElement
);
