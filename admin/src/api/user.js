import axios from "axios";
import {
  GetUsersStart,
  GetUsersSuccess,
  GetUsersError,
  GetUserStart,
  GetUserSuccess,
  GetUserError,
} from "../redux/userSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const getAllUser = async (dispatch, axiosJWT, accessToken) => {
  dispatch(GetUsersStart());
  try {
    const url = `${link}/v1/user/`;
    const res = await axiosJWT.get(url, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetUsersSuccess(res.data));
  } catch (error) {
    dispatch(GetUsersError());
  }
};

export const getUser = async (dispatch, id, axiosJWT, accessToken) => {
  dispatch(GetUserStart());
  try {
    console.log(id);
    const res = await axiosJWT.get(`${link}/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetUserSuccess(res.data));
  } catch (error) {
    dispatch(GetUserError());
  }
};

export const updateUser = async (dispatch, id, data, axiosJWT, accessToken) => {
  dispatch(GetUserStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/user/${id}`,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetUserSuccess(res.data));
  } catch (error) {
    dispatch(GetUserError());
  }
};

export const addUser = async (data, navigate, axiosJWT, accessToken) => {
  try {
    await axiosJWT.post(`${link}/v1/user/`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    window.location.reload();
    navigate("/Users");
  } catch (error) {
    alert("error");
  }
};

export const deleteUser = async (id, navigate, axiosJWT, accessToken) => {
  try {
    await axiosJWT.delete(`${link}/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/Users");
  } catch (error) {
    alert("error");
  }
};
