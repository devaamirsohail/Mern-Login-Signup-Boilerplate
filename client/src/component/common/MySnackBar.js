import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { DISABLE_FLASH_MESSAGE } from "../../actions/types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& >  + ": {
      marginTop: theme.spacing(2)
    }
  }
}));

function MySnackBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const show = useSelector(state => state.flash.show);
  const type = useSelector(state => state.flash.type);
  const message = useSelector(state => state.flash.message);
  return (
    <div className={classes.root}>
      <Snackbar
        key={message}
        open={show}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: DISABLE_FLASH_MESSAGE })}
      >
        <Alert
          onClose={() => dispatch({ type: DISABLE_FLASH_MESSAGE })}
          severity={type}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MySnackBar;
