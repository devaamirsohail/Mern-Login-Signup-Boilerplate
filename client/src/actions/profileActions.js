import axios from "axios";

import { updateUser } from "../utils/helpers";

import { GET_ERRORS, UPDATE_USER, ENABLE_FLASH_MESSAGE } from "./types";

//Register User
export const updateAdmin = (userData, token) => dispatch => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/user/admin/update`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: userData
  })
    .then(res => {
      updateUser(res, () => {
        dispatch({
          type: ENABLE_FLASH_MESSAGE,
          payload: { message: "Profile Updated Successfully.", type: "success" }
        });
      });
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Register User
export const updateSubscriber = (userData, token) => dispatch => {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/user/update`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: userData
  })
    .then(res => {
      updateUser(res, () => {
        dispatch({
          type: ENABLE_FLASH_MESSAGE,
          payload: { message: "Profile Updated Successfully.", type: "success" }
        });
      });
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ENABLE_FLASH_MESSAGE,
        payload: { message: "Error", type: "error" }
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
