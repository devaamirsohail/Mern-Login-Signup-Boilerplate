import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { forgotPassword } from "../../actions/authActions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "60vh"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Forgot = () => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const errors = useSelector(state => state.errors);

  const [values, setValues] = useState({
    email: ""
  });
  const { email } = values;

  const dispatch = useDispatch();

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  const forgotPasswordForm = () => (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <RotateLeftIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your Email Address"
          name="email"
          value={email}
          onChange={handleChange("email")}
          error={errors && (errors.email || errors.error) ? true : false}
          helperText={errors && (errors.email || errors.error)}
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Request Password Reset Link
        </Button>
      </form>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {auth ? <Redirect to="/" /> : null}
      {forgotPasswordForm()}
    </Container>
  );
};
export default Forgot;
