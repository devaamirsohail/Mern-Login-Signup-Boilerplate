import React from "react";
import { Link } from "react-router-dom";

import {
  makeStyles,
  CssBaseline,
  Typography,
  Container
} from "@material-ui/core";

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

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Page Not Found
      </Typography>
      <Typography component="h2" variant="h5">
        Sorry, this page does not exist
      </Typography>
      <Link to="/">Return to Home Page</Link>
    </Container>
  );
};
export default NotFound;
