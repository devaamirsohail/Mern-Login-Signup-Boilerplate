import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" align="center" color="inherit">
      {"Copyright © "}
      <Link className="text-light" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <Box mt={5}>
      <footer className={`${classes.footer} navbar-dark bg-dark text-light`}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </Box>
  );
};
