import { configureStore } from "@reduxjs/toolkit";
import { authReducer, screenReducer, profileReducer } from "./reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    screen: screenReducer,
    profile: profileReducer,
  },
});

export default store;
