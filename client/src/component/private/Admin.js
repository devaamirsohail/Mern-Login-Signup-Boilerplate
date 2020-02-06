import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";
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

import { isAuth, getCookie, signout } from "../../utils/helpers";
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

const Admin = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const dispatch = useDispatch();
  const token = getCookie("token");

  useEffect(() => {
    const loadProfile = () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          //console.log("Get User Response:", response);
          const { role, name, email } = response.data;
          setValues({
            ...values,
            role,
            name,
            email
          });
        })
        .catch(error => {
          console.log("Get User Error:", error.response.data);
          if (error.response.status === 401) {
            signout(() => {
              history.push("/signin");
            });
          }
        });
    };
    loadProfile();
  }, [history, token]);
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
            autoComplete="lname"
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
        <ToastContainer />
        {updateForm()}
      </div>
    </Container>
  );
};
export default Admin;
