import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useBackend } from "../utils/BackendProvider";
import history from "../utils/history";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isLoggedIn } = useBackend();

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    history.push('/');
  }, [isLoggedIn, path]);

  const render = props =>
    isLoggedIn === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;