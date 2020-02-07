import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";

import { getCookie } from "../../utils/helpers";
import { updateAdmin } from "../../actions/profileActions";

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

const Admin = () => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const errors = useSelector(state => state.errors);
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: ""
  });
  const dispatch = useDispatch();
  const token = getCookie("token");

  const { name, email, role, password } = values;

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      name,
      password
    };
    dispatch(updateAdmin(userData, token));
  };
  const updateForm = () => (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="Name"
            label="Name"
            name="name"
            onChange={handleChange("name")}
            value={name}
            error={errors && errors.name ? true : false}
            helperText={errors && errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="role"
            value={role}
            label="Role"
            name="role"
            autoComplete="role"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange("password")}
            value={password}
            error={errors && errors.password ? true : false}
            helperText={errors && errors.password}
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
        Update
      </Button>
    </form>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UpdateOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile Update
        </Typography>
        {auth ? null : <Redirect to="/signin" />}
        {updateForm()}
      </div>
    </Container>
  );
};
export default Admin;
