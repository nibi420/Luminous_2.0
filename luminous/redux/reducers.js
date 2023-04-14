import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state) => {
      state.isAuthenticated = true;
    },
  }
);

export const screenReducer = createReducer(
  {},
  {
    changeScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  }
);

export const profileReducer = createReducer(
  {},
  {
    changeProfile: (state, action) => {
      state.name = action.payload.fullname;
      state.username = action.payload.username;
      state.profilePicture = action.payload.profile_picture;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    destroyProfile: (state) => {
      state.name = "";
      state.username = "";
      state.profilePicture = "";
      state.role = "";
      state.email = "";
    },
  }
);
