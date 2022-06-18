import {
  UpdateFilter,
  FilteredProduct,
  UpdateSort,
  SortProduct,
  ClearFilter,
  SetListView,
  SetGridView,
} from "../redux/filterSlice";

export const updateFilter = (dispatch, e) => {
  let name = e.target.name;
  let value = e.target.value;
  if (name === "type") {
    value = e.target.textContent;
  }
  if (name === "price") {
    value = Number(value);
  }
  if (name === "shipping") {
    value = e.target.checked;
  }
  const data = {
    value,
    name,
  };
  dispatch(UpdateFilter(data));
};

export const updateSort = (dispatch, e) => {
  dispatch(UpdateSort(e));
};
export const sortProduct = (dispatch) => {
  dispatch(SortProduct());
};

export const filterProduct = (dispatch) => {
  dispatch(FilteredProduct());
};

export const clearFilter = (dispatch) => {
  dispatch(ClearFilter());
};

export const setListView = (dispatch) => {
  dispatch(SetListView());
};

export const setGridView = (dispatch) => {
  dispatch(SetGridView());
};
