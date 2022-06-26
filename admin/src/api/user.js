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

export const getAllUser = async (dispatch) => {
  dispatch(GetUsersStart());
  try {
    const url = `${link}/v1/user/`;
    const res = await axios.get(url);
    dispatch(GetUsersSuccess(res.data));
  } catch (error) {
    dispatch(GetUsersError());
  }
};

export const getUser = async (dispatch, id) => {
  dispatch(GetUserStart());
  try {
    const res = await axios.get(`${link}/v1/user/${id}`);
    dispatch(GetUserSuccess(res.data));
  } catch (error) {
    dispatch(GetUserError());
  }
};

export const updateUser = async (dispatch, id, data) => {
  dispatch(GetUserStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/user/${id}`,
      data,
    });
    dispatch(GetUserSuccess(res.data));
  } catch (error) {
    dispatch(GetUserError());
  }
};

export const addUser = async (data, navigate) => {
  try {
    await axios.post(`${link}/v1/user/`, data);
    navigate("/Users");
  } catch (error) {
    alert("error");
  }
};
