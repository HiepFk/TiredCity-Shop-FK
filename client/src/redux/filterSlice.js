import { createSlice, current } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    all_products: [],
    filtered_products: [],
    sort: "price-lowest",
    filters: {
      text: "",
      type: "all",
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
    },
    listView: true,
  },
  reducers: {
    SetFilterProduct: (state, action) => {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        filtered_products: action.payload,
        all_products: action.payload,
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    },
    SetListView: (state) => {
      return { ...state, listView: true };
    },
    SetGridView: (state) => {
      return { ...state, listView: false };
    },
    UpdateFilter: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    },
    FilteredProduct: (state) => {
      const { all_products } = current(state);
      const { text, type, price, shipping } = state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }

      if (type !== "all") {
        tempProducts = tempProducts.filter((product) => product.type === type);
      }

      tempProducts = tempProducts.filter((product) => product.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filtered_products: tempProducts };
    },
    UpdateSort: (state, action) => {
      return { ...state, sort: action.payload };
    },
    SortProduct: (state) => {
      const { sort, filtered_products } = state;
      let temProducts = [...filtered_products];
      if (sort === "price-lowest") {
        temProducts = temProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        temProducts = temProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        temProducts = temProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        temProducts = temProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: temProducts };
    },
    ClearFilter: (state) => {
      return {
        ...state,
        sort: "price-lowest",
        filters: {
          ...state.filters,
          text: "",
          type: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    },
  },
});

export const {
  UpdateFilter,
  FilteredProduct,
  UpdateSort,
  SortProduct,
  ClearFilter,
  SetListView,
  SetGridView,
  SetFilterProduct,
} = filterSlice.actions;
export default filterSlice.reducer;
