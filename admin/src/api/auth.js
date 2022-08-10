import axios from "axios";
import {
  LoginStart,
  LoginFailed,
  LoginSuccess,
  LogOutStart,
  LogOutSuccess,
  LogOutFailed,
} from "../redux/authSlice";
import { ShowAlert, HideAlert } from "../redux/alertSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

const ErrorMessage = (dispatch, error) => {
  if (error.response.data) {
    dispatch(ShowAlert(error.response.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  }
};

const SuccessMessage = (dispatch, data) => {
  dispatch(ShowAlert(data));
  const timeoutID = window.setTimeout(() => {
    dispatch(HideAlert());
  }, 3000);
  return () => window.clearTimeout(timeoutID);
};

export const login = async (user, dispatch, navigate) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(LoginSuccess(res.data));
    navigate("/");
    SuccessMessage(dispatch, res.data);
  } catch (error) {
    dispatch(LoginFailed());
    ErrorMessage(dispatch, error);
  }
};

export const logout = async (dispatch) => {
  dispatch(LogOutStart());
  try {
    const res = await axios.get(`${link}/v1/user/logout`);
    dispatch(LogOutSuccess());
    SuccessMessage(dispatch, res.data);
  } catch (error) {
    dispatch(LogOutFailed());
    ErrorMessage(dispatch, error);
  }
};

export const updateMe = async (dispatch, data, type, axiosJWT, accessToken) => {
  dispatch(LoginStart());
  try {
    const url =
      type === "password"
        ? `${link}/v1/user/updateMyPassword`
        : `${link}/v1/user/updateInfo`;

    const res = await axiosJWT({
      method: "PATCH",
      url,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    SuccessMessage(dispatch, res.data);
  } catch (error) {
    dispatch(LoginFailed());
    ErrorMessage(dispatch, error);
  }
};
