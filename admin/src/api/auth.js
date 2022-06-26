import axios from "axios";
import {
  LoginStart,
  LoginFailed,
  LoginSuccess,
  SignUpStart,
  SignUpFailed,
  SignUpSuccess,
  LogOutStart,
  LogOutSuccess,
  LogOutFailed,
  GetMeStart,
  GetMeError,
  GetMeSuccess,
} from "../redux/authSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const signup = async (user, dispatch, navigate) => {
  dispatch(SignUpStart());
  try {
    const res = await axios.post(`${link}/v1/user/signup`, user);
    dispatch(SignUpSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(SignUpFailed());
  }
};
export const login = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(LoginSuccess(res.data));
  } catch (error) {
    dispatch(LoginFailed());
  }
};

export const logout = async (dispatch) => {
  dispatch(LogOutStart());
  try {
    await axios.get(`${link}/v1/user/logout`);
    dispatch(LogOutSuccess());
  } catch (error) {
    dispatch(LogOutFailed());
  }
};

export const getMe = async (dispatch) => {
  dispatch(GetMeStart());
  try {
    const res = await axios.get(`${link}/v1/user/me`);
    dispatch(GetMeSuccess(res.data));
  } catch (error) {
    dispatch(GetMeError());
  }
};

export const updateMe = async (dispatch, data, type) => {
  dispatch(GetMeStart());
  try {
    const url =
      type === "password"
        ? `${link}/v1/user/updateMyPassword`
        : `${link}/v1/user/updateInfo`;

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    dispatch(GetMeSuccess(res.data));
  } catch (error) {
    dispatch(GetMeError());
  }
};
