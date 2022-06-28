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
export const updateProduct = async (dispatch, id, data) => {
  dispatch(GetProductStart());
  try {
    const res = await axios({
      method: "PATCH",
      url: `${link}/v1/product/${id}`,
      data,
    });
    dispatch(GetProductSuccess(res.data));
  } catch (error) {
    dispatch(GetProductError());
  }
};
export const deleteProduct = async (id, navigate) => {
  try {
    await axios.delete(`${link}/v1/product/${id}`);
    navigate("/products");
  } catch (error) {
    alert(error.message);
  }
};
export const addProduct = async (data, navigate) => {
  try {
    await axios({
      method: "POST",
      url: `${link}/v1/product`,
      data,
    });
    navigate("/products");
  } catch (error) {
    alert(error.message);
  }
};