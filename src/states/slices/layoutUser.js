import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  error: null,
  isSidebarOpen: true,
  loaded: 0,
  redirect: {
    redirect: false,
    to: "",
    replace: false,
    data: null,
  },
};

const layoutUserSlice = createSlice({
  name: "layoutUser",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    incrementLoaded: (state) => {
      state.loaded += 1;
    },
    resetLoaded: (state) => {
      state.loaded = 0;
    },
    setRedirect: (state, action) => {
      state.redirect = action.payload;
    },
    resetRedirect: (state) => {
      state.redirect = {
        redirect: false,
        to: "",
        replace: false,
        data: null,
      };
    },
  },
});

export const {
  setOpenModal,
  setError,
  setIsSidebarOpen,
  incrementLoaded,
  resetLoaded,
  setRedirect,
  resetRedirect,
} = layoutUserSlice.actions;

export default layoutUserSlice.reducer;
