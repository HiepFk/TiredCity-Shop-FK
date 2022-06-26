import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    loading: false,
    error: false,
    msg: "",
  },
  reducers: {
    GetUsersStart: (state) => {
      return { ...state, loading: true };
    },
    GetUsersError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetUsersSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        users: action.payload,
      };
    },
    GetUserStart: (state) => {
      return { ...state, loading: true };
    },
    GetUserError: (state) => {
      return { ...state, error: true, loading: false };
    },
    GetUserSuccess: (state, action) => {
      return {
        ...state,
        error: false,
        loading: false,
        user: action.payload,
      };
    },
  },
});

export const {
  GetUsersStart,
  GetUsersSuccess,
  GetUsersError,
  GetUserStart,
  GetUserSuccess,
  GetUserError,
} = userSlice.actions;
export default userSlice.reducer;
