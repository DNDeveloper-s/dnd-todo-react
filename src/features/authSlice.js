import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    curUser: {}
  },
  reducers: {
    AUTH_STATE: (state, action) => {
      const {isLoggedIn, token, user} = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.token = token;
      state.curUser = user;

      if(isLoggedIn)
        window.localStorage.setItem("bearer", token);
    },
  },
});

export const { AUTH_STATE } = authSlice.actions;

export const getAuthState = (store) => {
  return store.auth;
};
export const getCurUser = (store) => store.auth.curUser;

const globalReducer = authSlice.reducer;

export default globalReducer;
