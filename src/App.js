import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import FrontPage from "./sites/FrontPage/FrontPage";
import DesignPage from "./sites/DesignPage/DesignPage";
import FeedbackPage from "./sites/FeedbackPage/FeedbackPage";
import BuildingsPage from "./sites/BuildingsPage/BuildingsPage";
import SavedBuildingPage from "./sites/SavedBuildingPage/SavedBuildingPage";
import PublicBuildingPage from "./sites/PublicBuildingPage/PublicBuildingPage";
import DemoPage from "./sites/DemoPage/DemoPage";
import CoDesignPage from "./sites/CoDesignPage/CoDesignPage";
import AdminPage from "./sites/AdminPage/AdminPage";
import AboutPage from "./sites/AboutPage/AboutPage"
import InstructionsPage from "./sites/InstructionsPage/InstructionsPage";
import { CssBaseline } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <CssBaseline>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={FrontPage}></Route>
          <Route path="/design/:slug?" exact component={DesignPage}></Route>
          <Route path="/public/building/:slug" exact component={PublicBuildingPage}></Route>
          <Route path="/demo" exact component={DemoPage}></Route>
          <Route path="/co-design" exact component={CoDesignPage}></Route>
          <Route path="/instructions" exact component={InstructionsPage}></Route>
          <Route path="/about" exact component={AboutPage}></Route>
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
