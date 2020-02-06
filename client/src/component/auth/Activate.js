import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

import { activateAccount } from "../../actions/authActions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  }
}));

const Activate = ({ match, history }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true
  });
  const classes = useStyles();
  useEffect(() => {
    const getTokenValues = () => {
      const token = match.params.token;
      //console.log(token);
      if (token) {
        let { name } = jwt.decode(token);
        setValues({ ...values, name, token });
      }
    };
    getTokenValues();
  }, []);
  const { name, token, show } = values;

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(activateAccount({ token, history }));
  };
  const activateAccountForm = () => (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Hey <b>{name}</b>, Ready to activate your account?
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Activate Account
          </button>
        </Typography>
      </Container>
    </div>
  );
  return (
    <div className="col-md-6 col-md-offset-3">
      <ToastContainer />
      {show ? null : <Redirect to="/signin" />}
      {activateAccountForm()}
    </div>
  );
};
export default withRouter(Activate);
