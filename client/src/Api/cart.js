import axios from "axios";
import {
  AddProduct,
  DeleteProduct,
  ClearCart,
  DecreaseProduct,
  IncreaseProduct,
  GetToTal,
  GetOrderStart,
  GetOrderError,
  GetOrderSuccess,
} from "../redux/cartSlice";
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

export const getMyOrder = async (dispatch, axiosJWT, accessToken) => {
  dispatch(GetOrderStart());
  try {
    const res = await axiosJWT.get(`${link}/v1/order/myorder`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetOrderSuccess(res.data));
  } catch (error) {
    dispatch(GetOrderError());
  }
};

export const addOrder = async (
  dispatch,
  navigate,
  data,
  axiosJWT,
  accessToken
) => {
  try {
    const res = await axiosJWT.post(`${link}/v1/order/user`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(ShowAlert(res.data));
    navigate("/myorder");
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    ErrorMessage(dispatch, error);
  }
};

export const addProduct = (dispatch, data) => {
  dispatch(AddProduct(data));
  const msg = {
    status: "success",
    message: "Sản phẩm đã được thêm vào giỏ hàng",
  };
  dispatch(ShowAlert(msg));
  const timeoutID = window.setTimeout(() => {
    dispatch(HideAlert());
  }, 2000);
  return () => window.clearTimeout(timeoutID);
};

export const deleteProduct = (dispatch, id) => {
  dispatch(DeleteProduct(id));
  const msg = {
    status: "success",
    message: "Sản phẩm đã được xóa khỏi giỏ hàng",
  };
  dispatch(ShowAlert(msg));
  const timeoutID = window.setTimeout(() => {
    dispatch(HideAlert());
  }, 2000);
  return () => window.clearTimeout(timeoutID);
};

export const clearCart = (dispatch) => {
  dispatch(ClearCart());
};

export const increase = (dispatch, id) => {
  dispatch(IncreaseProduct(id));
};

export const decrease = (dispatch, id) => {
  dispatch(DecreaseProduct(id));
};

export const getTotal = (dispatch) => {
  dispatch(GetToTal());
};
