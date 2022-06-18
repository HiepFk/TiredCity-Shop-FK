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
      const { id, image, name, price, amount, color, size } = action.payload;
      const newProduct = { id, image, name, price, amount, color, size };
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
          item = { ...item, amount: item.amount - 1 };
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
} = cartSlice.actions;
export default cartSlice.reducer;
