import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    order: [],
    products: [],
    totalQty: 0,
    totalCost: 0,
    loading: false,
    error: false,
  },
  reducers: {
    GetOrderStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetOrderError: (state) => {
      return { ...state, loading: false, error: true };
    },
    GetOrderSuccess: (state, action) => {
      return { ...state, loading: false, error: false, order: action.payload };
    },
    AddProduct: (state, action) => {
      const { id, image, name, price, amount, color, size } = action.payload;
      const newProduct = { id, image, name, price, amount, color, size };
      const tempItem = state.products.find((i) => i.id === id);
      if (tempItem) {
        const tempCart = state.products.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = amount + cartItem.amount;
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, products: tempCart };
      }
      return { ...state, products: [...state.products, newProduct] };
    },
    DeleteProduct: (state, action) => {
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    },
    ClearCart: (state) => {
      return { ...state, products: [], totalQty: 0, totalCost: 0 };
    },
    DecreaseProduct: (state, action) => {
      let tempProducts = state.products.map((item) => {
        if (item.id === action.payload) {
          if (item.amount < 2) {
            item = { ...item, amount: 1 };
          } else {
            item = { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      });
      return { ...state, products: tempProducts };
    },
    IncreaseProduct: (state, action) => {
      let tempProducts = state.products.map((item) => {
        if (item.id === action.payload) {
          item = { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, products: tempProducts };
    },
    GetToTal: (state) => {
      let { totalCost, totalQty } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { amount, price } = cartItem;
          cartTotal.totalCost += price * amount;
          cartTotal.totalQty += amount;
          return cartTotal;
        },
        {
          totalCost: 0,
          totalQty: 0,
        }
      );
      totalCost = parseFloat(totalCost.toFixed(2));
      return { ...state, totalCost, totalQty };
    },
  },
});

export const {
  AddProduct,
  DeleteProduct,
  ClearCart,
  DecreaseProduct,
  IncreaseProduct,
  GetToTal,
  GetOrderStart,
  GetOrderError,
  GetOrderSuccess,
} = cartSlice.actions;
export default cartSlice.reducer;
