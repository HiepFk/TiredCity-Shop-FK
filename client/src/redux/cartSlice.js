import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQty: 0,
    totalCost: 0,
  },
  reducers: {
    AddProduct: (state, action) => {
      return {
        ...state,
        cart: state.products.push(action.payload),
      };
    },
    DeleteProduct: (state, action) => {
      return {
        ...state,
        cart: state.products.filter((item) => item.id !== action.payload.id),
      };
    },
    ClearCart: (state) => {
      return { ...state, products: [], totalQty: 0, totalCost: 0 };
    },
    DecreaseProduct: (state, action) => {
      let tempProducts = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item = { ...item, amount: item.quantity - 1 };
        }
        return item;
      });
      return { ...state, products: tempProducts };
    },
    IncreaseProduct: (state, action) => {
      let tempProducts = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item = { ...item, amount: item.quantity + 1 };
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
} = cartSlice.actions;
export default cartSlice.reducer;
