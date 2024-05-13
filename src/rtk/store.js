import { configureStore } from "@reduxjs/toolkit";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";
import genresReducer from "./slices/genresSlice";
import booksReducer from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    users: usersReducer,
    genres: genresReducer,
    books: booksReducer,
    auth: authReducer,
  },
});

export default store;
