import React, { useState } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import history from "./utils/history";
import FrontPage from './sites/FrontPage/FrontPage';
import LoginPage from './sites/LoginPage/LoginPage';
import DesignPage from './sites/DesignPage/DesignPage'
import RegisterPage from './sites/RegisterPage/RegisterPage';
import { CssBaseline } from "@material-ui/core";

function App() {

  return (
    <CssBaseline>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={FrontPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          <Route path="/design" exact component={DesignPage}></Route>
          <Route path="/register" exact component={RegisterPage}></Route>
        </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
