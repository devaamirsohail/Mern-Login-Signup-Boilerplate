import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
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
export default AdminRoute;
