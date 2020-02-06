import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";

import store from "./store";

import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import Landing from "./component/layout/Landing";
import Signup from "./component/auth/Signup";
import Signin from "./component/auth/Signin";
import Activate from "./component/auth/Activate";
import Forgot from "./component/auth/Forgot";
import Reset from "./component/auth/Reset";
import AdminRoute from "./utils/common/AdminRoute";
import PrivateRoute from "./utils/common/PrivateRoute";
import Admin from "./component/private/Admin";
import Subscriber from "./component/private/Subscriber";
import NotFound from "./component/not-found/NotFound";

import { getCookie } from "./utils/helpers";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";

//Check for token
const token = getCookie("token");
const user = localStorage.getItem("user");
if (token) {
  //Decode token and get user info and expo
  const decoded = jwt_decode(token);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(JSON.parse(user)));
  console.log(user);
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Redirect to Login
    window.location.href = "/signin";
  }
}
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/auth/activate/:token" component={Activate} />
            <AdminRoute path="/admin" component={Admin} />
            <PrivateRoute path="/subscriber" component={Subscriber} />
            <Route path="/forgot-password" component={Forgot} />
            <Route path="/reset-password/:token" component={Reset} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
