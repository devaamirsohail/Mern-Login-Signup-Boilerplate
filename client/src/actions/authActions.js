import axios from "axios";

import { authenticate, isAuth, signout } from "../utils/helpers";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  LOADING,
  ENABLE_FLASH_MESSAGE
} from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API}/signup`, userData)
    .then(res => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: res.data.message, type: "success" }
      });
      history.push("/signin");
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
      });
    });
};
//Activate Account
export const activateAccount = (token, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API}/account-activation`, token)
    .then(res => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: res.data.message, type: "success" }
      });
      dispatch(clearErrors());
      history.push("/signin");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: err.response.data.error, type: "error" }
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
          : history.push("/subscriber");
      });
      const { user } = res.data;
      //set current user
      dispatch(setCurrentUser(user));
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
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
          : history.push("/subscriber");
      });
      const { user } = res.data;
      //set current user
      dispatch(setCurrentUser(user));
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { GoogleLoginError: "Connection Error, Please try again" }
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error, Try Again", type: "error" }
      });
    });
};
//Forgot Pasword
export const forgotPassword = email => dispatch => {
  axios
    .put(`${process.env.REACT_APP_API}/forgot-password`, email)
    .then(res => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: res.data.message, type: "success" }
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
      });
    });
};
//Reset Pasword
export const resetPassword = resetPasswordData => dispatch => {
  axios
    .put(`${process.env.REACT_APP_API}/reset-password`, resetPasswordData)
    .then(res => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: res.data.message, type: "success" }
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
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
  dispatch(clearErrors());
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
