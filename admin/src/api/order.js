import axios from "axios";
import {
  GetOrdersStart,
  GetOrdersSuccess,
  GetOrdersError,
  GetOrderStart,
  GetOrderSuccess,
  GetOrderError,
} from "../redux/productSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const getAllOrder = async (dispatch) => {
  dispatch(GetOrdersStart());
  try {
    const res = await axios.get(`${link}/v1/order/`);
    dispatch(GetOrdersSuccess(res.data));
  } catch (error) {
    GetOrdersError(dispatch, error);
  }
};
export const getOrder = async (dispatch, id) => {
  dispatch(GetOrderStart());
  try {
    const res = await axios.get(`${link}/v1/order/${id}`);
    dispatch(GetOrderSuccess(res.data));
  } catch (error) {
    GetOrderError(dispatch, error);
  }
};

export const updateOrder = async (dispatch, id, data) => {
  dispatch(GetOrderStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/order/${id}`,
      data,
    });
    dispatch(GetOrderSuccess(res.data));
  } catch (error) {
    dispatch(GetOrderError());
  }
};
