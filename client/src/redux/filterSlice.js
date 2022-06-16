import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    updateFilter: (state, action) => {
      const [name, value] = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    },
    filteredProduct: (state) => {
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      tempProducts = tempProducts.filter((product) => product.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      return { ...state, filtered_products: tempProducts };
    },
    updateSort: (state, action) => {
      return { ...state, sort: action.payload };
    },
    sortProduct: (state) => {
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
    clearFilter: (state) => {
      return {
        ...state,
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
  updateFilter,
  filteredProduct,
  updateSort,
  sortProduct,
  clearFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
