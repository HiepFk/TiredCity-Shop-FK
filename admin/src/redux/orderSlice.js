import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    loading: false,
    error: false,
    msg: "",
  },
  reducers: {
    GetOrdersStart: (state) => {
      return { ...state, loading: true };
    },
    GetOrdersError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetOrdersSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        orders: action.payload,
      };
    },
    GetOrderStart: (state) => {
      return { ...state, loading: true };
    },
    GetOrderError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetOrderSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        order: action.payload,
      };
    },
  },
});

export const {
  GetOrdersStart,
  GetOrdersSuccess,
  GetOrdersError,
  GetOrderStart,
  GetOrderSuccess,
  GetOrderError,
} = orderSlice.actions;
export default orderSlice.reducer;
