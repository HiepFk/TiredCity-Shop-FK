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
export const updateProduct = async (
  dispatch,
  id,
  data,
  axiosJWT,
  accessToken
) => {
  dispatch(GetProductStart());
  try {
    const res = await axiosJWT({
      method: "PATCH",
      url: `${link}/v1/product/${id}`,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetProductSuccess(res.data));
  } catch (error) {
    dispatch(GetProductError());
  }
};
export const deleteProduct = async (id, navigate, axiosJWT, accessToken) => {
  try {
    await axiosJWT.delete(`${link}/v1/product/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/products");
  } catch (error) {
    alert(error.message);
  }
};
export const addProduct = async (data, navigate, axiosJWT, accessToken) => {
  try {
    await axiosJWT({
      method: "POST",
      url: `${link}/v1/product`,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    navigate("/products");
  } catch (error) {
    alert(error.message);
  }
};
