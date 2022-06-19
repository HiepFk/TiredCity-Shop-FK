import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    LoginStart: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    LoginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    SignUpStart: (state) => {
      state.loading = true;
    },
    SignUpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    SignUpFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    LogOutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.error = false;
    },
    LogOutFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    LogOutStart: (state) => {
      state.loading = true;
    },
    GetMeStart: (state) => {
      state.loading = true;
    },
    GetMeError: (state) => {
      state.loading = false;
      state.error = true;
    },
    GetMeSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
  },
});

export const {
  LoginStart,
  LoginFailed,
  LoginSuccess,
  SignUpStart,
  SignUpFailed,
  SignUpSuccess,
  LogOutStart,
  LogOutSuccess,
  LogOutFailed,
  GetMeStart,
  GetMeError,
  GetMeSuccess,
} = authSlice.actions;

export default authSlice.reducer;
