import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    snapURL: ""
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSnapURL: (state, action) => {
      state.snapURL = action.payload;
    }
  }
});

export const { login, logout, setSnapURL } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectSnapURL = (state) => state.app.snapURL;

export default appSlice.reducer;
