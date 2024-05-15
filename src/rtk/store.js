import { configureStore } from "@reduxjs/toolkit";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";
import genresReducer from "./slices/genresSlice";
import booksReducer from "./slices/booksSlice";
import transactionsReducer from "./slices/transactionsSlice";

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    users: usersReducer,
    transactions: transactionsReducer,
    genres: genresReducer,
    books: booksReducer,
    auth: authReducer,
  },
});

export default store;
