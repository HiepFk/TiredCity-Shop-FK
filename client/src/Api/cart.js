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
const link = "http://localhost:3000";

const ErrorMessage = (dispatch, error) => {
  dispatch(ShowAlert(error.response.data));
  const timeoutID = window.setTimeout(() => {
    dispatch(HideAlert());
  }, 3000);
  return () => window.clearTimeout(timeoutID);
};

export const getMyOrder = async (dispatch) => {
  dispatch(GetOrderStart());
  try {
    const res = await axios.get(`${link}/v1/order/myorder`);
    dispatch(GetOrderSuccess(res.data));
    dispatch(ShowAlert(res.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  } catch (error) {
    dispatch(GetOrderError());
    ErrorMessage(dispatch, error);
  }
};

export const addOrder = async (dispatch, navigate, data) => {
  try {
    console.log(data);
    const res = await axios.post(`${link}/v1/order/user`, data);
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
};

export const deleteProduct = (dispatch, id) => {
  dispatch(DeleteProduct(id));
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
