import axios from "axios";
import {
  GetOrdersStart,
  GetOrdersSuccess,
  GetOrdersError,
  GetOrderStart,
  GetOrderSuccess,
  GetOrderError,
} from "../redux/orderSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const getAllOrder = async (dispatch, axiosJWT, accessToken) => {
  dispatch(GetOrdersStart());
  try {
    const res = await axiosJWT.get(`${link}/v1/order/`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetOrdersSuccess(res.data));
  } catch (error) {
    GetOrdersError(dispatch, error);
  }
};
export const getOrder = async (dispatch, id, axiosJWT, accessToken) => {
  dispatch(GetOrderStart());
  try {
    const res = await axiosJWT.get(`${link}/v1/order/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetOrderSuccess(res.data));
  } catch (error) {
    GetOrderError(dispatch, error);
  }
};

export const updateOrder = async (
  dispatch,
  id,
  data,
  axiosJWT,
  accessToken
) => {
  dispatch(GetOrderStart());
  try {
    const res = await axiosJWT({
      method: "PATCH",
      url: `${link}/v1/order/${id}`,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetOrderSuccess(res.data));
  } catch (error) {
    dispatch(GetOrderError());
  }
};
export const deleteOrder = async (id, navigate, axiosJWT, accessToken) => {
  try {
    await axiosJWT.delete(`${link}/v1/order/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/products");
  } catch (error) {
    alert(error.message);
  }
};
