import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import './assets/scss/main.scss';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { DiagramScreen, HomeScreen, NotFoundScreen } from './screens';
import { LayoutComponent } from './components';
import { ContextProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <LayoutComponent>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/diagram" component={DiagramScreen} />
            <Route exact path="/not-found" component={NotFoundScreen} />
            <Redirect from="*" to="/not-found" />
          </Switch>
        </LayoutComponent>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
