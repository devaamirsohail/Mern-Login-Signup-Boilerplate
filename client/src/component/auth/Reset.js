import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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

import { resetPassword } from "../../actions/authActions";

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

const Reset = ({ match }) => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const errors = useSelector(state => state.errors);

  //props.match from react router dom
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: ""
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);
  const { name, token, newPassword } = values;
  const dispatch = useDispatch();

  const handleChange = event => {
    //console.log(event.target.value);
    setValues({ ...values, newPassword: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const resetPasswordData = {
      newPassword,
      resetPasswordLink: token
    };
    dispatch(resetPassword(resetPasswordData));
  };
  const resetPasswordForm = () => (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <RotateLeftIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Hey <b>{name}</b>, Type your new password
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          onChange={handleChange}
          value={newPassword}
          error={errors && errors.password ? true : false}
          helperText={errors && errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          New Password
        </Button>
      </form>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {auth ? <Redirect to="/" /> : null}
      {resetPasswordForm()}
    </Container>
  );
};
export default Reset;
