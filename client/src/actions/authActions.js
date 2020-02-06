import axios from "axios";

import { toast } from "react-toastify";

import { authenticate, isAuth, signout } from "../utils/helpers";

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER, LOADING } from "./types";

//Register User
export const registerUser = userData => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  axios
    .post(`${process.env.REACT_APP_API}/signup`, userData)
    .then(res => {
      toast.success(res.data.message);
    })
    .catch(err => {
      toast.error(err.response.data.name);
      toast.error(err.response.data.email);
      toast.error(err.response.data.password);
      toast.error(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Activate Account
export const activateAccount = (token, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API}/account-activation`, token)
    .then(res => {
      toast.success(res.data.message);
      history.push("/signin");
    })
    .catch(err => {
      console.log(err);
      toast.error(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login - GET User
export const loginUser = (userData, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API}/signin`, userData)
    .then(res => {
      //set token to local storage and cookie
      authenticate(res, () => {
        isAuth() && isAuth().role === "admin"
          ? history.push("/admin")
          : history.push("subscriber");
      });
      const { user } = res.data;
      //set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      toast.error(err.response.data.error);
      toast.error(err.response.data.email);
      toast.error(err.response.data.password);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Login through Google- GET User
export const googleLoginUser = (idToken, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API}/google-login`, idToken)
    .then(res => {
      //set token to local storage and cookie
      authenticate(res, () => {
        isAuth() && isAuth().role === "admin"
          ? history.push("/admin")
          : history.push("subscriber");
      });
      const { user } = res.data;
      //set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      console.log(err);
      toast.error(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      });
    });
};
//Forget Pasword
export const forgetPassword = email => dispatch => {
  axios
    .put(`${process.env.REACT_APP_API}/forgot-password`, email)
    .then(res => toast.success(res.data.message))
    .catch(err => {
      console.log(err.response);

      toast.error(err.response.data.email);
      toast.error(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Reset Pasword
export const resetPassword = resetPasswordData => dispatch => {
  axios
    .put(`${process.env.REACT_APP_API}/reset-password`, resetPasswordData)
    .then(res => {
      toast.success(res.data.message);
    })
    .catch(err => {
      toast.error(err.response.data.error);
      toast.error(err.response.data.password);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// Set Login User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  signout();
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
//Set Loading state
export const setLoading = () => {
  return {
    type: LOADING
  };
};
//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
