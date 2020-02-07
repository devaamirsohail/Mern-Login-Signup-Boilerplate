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
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Page Not Found
        </Typography>
        <Typography component="h2" variant="h5">
          Sorry, this page does not exist
        </Typography>
        <Link to="/">Return to Home Page</Link>
      </div>
    </Container>
  );
};
export default NotFound;
