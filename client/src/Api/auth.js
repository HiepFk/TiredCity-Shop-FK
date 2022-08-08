import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
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
import { ShowAlert, HideAlert } from "../redux/alertSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

const ErrorMessage = (dispatch, error) => {
  if (error.response.data) {
    console.log(error.response);
    dispatch(ShowAlert(error.response.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  }
};

export const signInWithGoogle = async (dispatch, navigate) => {
  dispatch(LoginStart());
  signInWithPopup(auth, provider)
    .then((result) => {
      axios
        .post(`${link}/v1/user/sign-google`, {
          name: result.user.displayName,
          email: result.user.email,
        })
        .then((res) => {
          dispatch(LoginSuccess(res.data));
          dispatch(ShowAlert(res.data));
          navigate("/");
          const timeoutID = window.setTimeout(() => {
            dispatch(HideAlert());
          }, 3000);
          return () => window.clearTimeout(timeoutID);
        });
    })
    .catch((error) => {
      dispatch(LoginFailed());
      ErrorMessage(dispatch, error);
    });
};

export const signUp = async (user, dispatch, navigate) => {
  dispatch(SignUpStart());
  try {
    const res = await axios.post(`${link}/v1/user/signup`, user);
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(SignUpFailed());
    ErrorMessage(dispatch, error);
  }
};

export const activeEmail = async (activation_token, dispatch, navigate) => {
  try {
    const res = await axios.post(`${link}/v1/user/activation`, {
      activation_token,
    });
    dispatch(SignUpSuccess(res.data));
    dispatch(ShowAlert(res.data));
    navigate("/");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 5000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(LoginSuccess(res.data));
    dispatch(ShowAlert(res.data));
    navigate("/");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(LoginFailed());
    ErrorMessage(dispatch, error);
  }
};

export const logOutUser = async (dispatch, navigate) => {
  dispatch(LogOutStart());
  try {
    const res = await axios.get(`${link}/v1/user/logout`);
    dispatch(LogOutSuccess());
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(LogOutFailed());
  }
};

export const GetMe = async (dispatch, axiosJWT, accessToken) => {
  dispatch(GetMeStart());
  console.log(accessToken);
  try {
    await axiosJWT.get(`${link}/v1/user/me`, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    dispatch(GetMeError());
  }
};

export const UpdateMe = async (dispatch, data, type, axiosJWT, accessToken) => {
  dispatch(GetMeStart());
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
    dispatch(GetMeSuccess(res.data));
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetMeError());
    ErrorMessage(dispatch, error);
  }
};

export const createReivew = async (data, dispatch, axiosJWT, accessToken) => {
  try {
    const res = await axiosJWT.post(`${link}/v1/review/user`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

export const forgotPassword = async (email, dispatch) => {
  try {
    const res = await axios.post(`${link}/v1/user/forgot`, { email });
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 5000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

export const resetPassword = async (data, dispatch, navigate) => {
  try {
    const res = await axios.post(`${link}/v1/user/reset`, data);
    dispatch(SignUpSuccess(res.data));
    dispatch(ShowAlert(res.data));
    navigate("/");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 5000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};
