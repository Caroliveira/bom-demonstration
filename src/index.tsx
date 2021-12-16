import React from "react";
import ReactDOM from "react-dom";
import { ReactFlowProvider } from "react-flow-renderer";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  ConversionsScreen,
  DiagramScreen,
  HomeScreen,
  NodeScreen,
  NotFoundScreen,
  SimulatorScreen,
} from "./screens";

import { ProjectContextProvider } from "./context";
import reportWebVitals from "./reportWebVitals";
import Layout from "./layout";
import "./assets/scss/main.scss";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <ProjectContextProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/diagram" component={DiagramScreen} />
              <Route exact path="/node/:id" component={NodeScreen} />
              <Route exact path="/simulator" component={SimulatorScreen} />
              <Route exact path="/conversions" component={ConversionsScreen} />
              <Route exact path="/not-found" component={NotFoundScreen} />
              <Redirect from="*" to="/not-found" />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ProjectContextProvider>
    </ReactFlowProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
