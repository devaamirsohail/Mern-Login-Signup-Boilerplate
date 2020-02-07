import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.auth.user);
  const auth = useSelector(state => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        auth && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
