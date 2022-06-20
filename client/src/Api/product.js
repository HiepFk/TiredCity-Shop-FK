import axios from "axios";
import {
  GetProductsStart,
  GetProductsSuccess,
  GetProductsError,
  GetProductStart,
  GetProductSuccess,
  GetProductError,
} from "../redux/productSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const getAllProduct = async (dispatch) => {
  dispatch(GetProductsStart());
  try {
    const res = await axios.get(`${link}/v1/product/`);
    dispatch(GetProductsSuccess(res.data));
  } catch (error) {
    GetProductsError(dispatch, error);
  }
};
export const getProduct = async (dispatch, id) => {
  dispatch(GetProductStart());
  try {
    const res = await axios.get(`${link}/v1/product/${id}`);
    dispatch(GetProductSuccess(res.data));
  } catch (error) {
    GetProductError(dispatch, error);
  }
};
