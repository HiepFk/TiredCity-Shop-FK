import {
  AddProduct,
  DeleteProduct,
  ClearCart,
  DecreaseProduct,
  IncreaseProduct,
  GetToTal,
} from "../redux/cartSlice";

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
