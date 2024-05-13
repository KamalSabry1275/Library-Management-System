import { configureStore } from "@reduxjs/toolkit";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import projectsReducer from "./slices/projectsSlice";
import modulesReducer from "./slices/modulesSlice";

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    projects: projectsReducer,
    modules: modulesReducer,
  },
});

export default store;
