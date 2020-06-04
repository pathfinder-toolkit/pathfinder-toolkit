import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from "./utils/history";
import FrontPage from './sites/FrontPage/FrontPage';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={FrontPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
