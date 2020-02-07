import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import { registerUser, clearErrors } from "../../actions/authActions";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const classes = useStyles();

  const auth = useSelector(state => state.auth.isAuthenticated);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const { name, email, password } = values;
  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      name,
      email,
      password
    };
    dispatch(registerUser(userData, history));
  };

  const signupForm = () => (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={errors && errors.name ? true : false}
            helperText={errors && errors.name}
            variant="outlined"
            required
            fullWidth
            id="Name"
            label="Name"
            name="name"
            onChange={handleChange("name")}
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && (errors.email || errors.error) ? true : false}
            helperText={errors && (errors.email || errors.error)}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleChange("email")}
            value={email}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && errors.password ? true : false}
            helperText={errors && errors.password}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange("password")}
            value={password}
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            onClick={() => dispatch(clearErrors())}
            to="/signin"
            variant="body2"
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {auth ? <Redirect to="/" /> : null}
        {signupForm()}
      </div>
    </Container>
  );
};

export default withRouter(Signup);
