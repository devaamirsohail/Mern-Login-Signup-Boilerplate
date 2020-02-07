import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginUser, clearErrors } from "../../actions/authActions";
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import Google from "./Google";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

const Signin = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const { email, password } = values;

  const auth = useSelector(state => state.auth.isAuthenticated);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    dispatch(loginUser(userData, history));
  };
  const signinForm = () => (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ExitToAppOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={handleChange("email")}
          error={errors && (errors.email || errors.error) ? true : false}
          helperText={errors && (errors.email || errors.error)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleChange("password")}
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
          Sign In
        </Button>
        <Google />
        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => dispatch(clearErrors())}
              to="/forgot-password"
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => dispatch(clearErrors())}
              to="/signup"
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      {auth ? <Redirect to="/" /> : null}
      <CssBaseline />
      {signinForm()}
    </Container>
  );
};

export default withRouter(Signin);
