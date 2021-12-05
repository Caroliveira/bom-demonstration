import React from "react";
import ReactDOM from "react-dom";
import { ReactFlowProvider } from "react-flow-renderer";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  DiagramScreen,
  HomeScreen,
  NodeScreen,
  NotFoundScreen,
  SimulatorScreen,
} from "./screens";

import reportWebVitals from "./reportWebVitals";
import { LayoutComponent } from "./components";
import { MainContextProvider } from "./context";
import "./assets/scss/main.scss";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <MainContextProvider>
        <BrowserRouter>
          <LayoutComponent>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/diagram" component={DiagramScreen} />
              <Route exact path="/node/:id" component={NodeScreen} />
              <Route exact path="/simulator" component={SimulatorScreen} />
              <Route exact path="/not-found" component={NotFoundScreen} />
              <Redirect from="*" to="/not-found" />
            </Switch>
          </LayoutComponent>
        </BrowserRouter>
      </MainContextProvider>
    </ReactFlowProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
