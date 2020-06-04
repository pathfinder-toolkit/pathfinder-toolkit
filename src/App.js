import React, { useState } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import history from "./utils/history";
import CssBaseline from "@material-ui/core/CssBaseline"
import FrontPage from './sites/FrontPage/FrontPage';
import LoginPage from './sites/LoginPage/LoginPage';
import DesignPage from './sites/DesignPage/DesignPage'


function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={FrontPage}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/design" exact component={DesignPage}></Route>
      </Switch>
      <CssBaseline/>
    </Router>
  );
}

export default App;
