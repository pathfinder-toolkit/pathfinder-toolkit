import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import FrontPage from "./sites/FrontPage/FrontPage";
import LoginPage from "./sites/LoginPage/LoginPage";
import DesignPage from "./sites/DesignPage/DesignPage";
import RegisterPage from "./sites/RegisterPage/RegisterPage";
import FeedbackPage from "./sites/FeedbackPage/FeedbackPage";
import BuildingsPage from "./sites/BuildingsPage/BuildingsPage";
import SavedBuildingPage from "./sites/SavedBuildingPage/SavedBuildingPage";
import AdminPage from "./sites/AdminPage/AdminPage";
import { CssBaseline } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <CssBaseline>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={FrontPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          <Route path="/design/:slug?" exact component={DesignPage}></Route>

          <PrivateRoute path="/register" exact component={RegisterPage}></PrivateRoute>
          <PrivateRoute path="/feedback" exact component={FeedbackPage}></PrivateRoute>
          <PrivateRoute path="/buildings" exact component={BuildingsPage}></PrivateRoute>
          <PrivateRoute
            path="/buildings/:slug"
            exact
            component={SavedBuildingPage}
          ></PrivateRoute>
          <PrivateRoute path="/admin" exact component={AdminPage}></PrivateRoute>
        </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
