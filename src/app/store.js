import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUpSlice";
import cameraReducer from "../features/cameraSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    camera: cameraReducer,
    app: appReducer
  }
});
