/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        navigation: AppRouterInstance;
      }>,
    ) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
      state.isLoggedIn = true;
    },
    loginFail(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { login, loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;
