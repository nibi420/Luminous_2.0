import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.isAuthenticated = true;
      state.error = action.payload;
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
