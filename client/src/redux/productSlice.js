import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: false,
    msg: "",
  },
  reducers: {
    GetProductsStart: (state) => {
      return { ...state, loading: true };
    },
    GetProductsError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetProductsSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        products: action.payload,
      };
    },
    GetProductStart: (state) => {
      return { ...state, loading: true };
    },
    GetProductError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetProductSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        product: action.payload,
      };
    },
  },
});

export const {
  GetProductsStart,
  GetProductsSuccess,
  GetProductsError,
  GetProductStart,
  GetProductSuccess,
  GetProductError,
} = userSlice.actions;
export default userSlice.reducer;
