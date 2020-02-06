import axios from "axios";

import { toast } from "react-toastify";

import { updateUser } from "../utils/helpers";

import { GET_ERRORS, UPDATE_USER } from "./types";

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
        toast.success("Profile Updated Successfully.");
      });
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.error);
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
        toast.success("Profile Updated Successfully.");
      });
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
