import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis, routes } from "../../components/URLs";
import { jwtDecode } from "jwt-decode";
import { decryptAndRetrieve } from "./authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { parse } from "@fortawesome/fontawesome-svg-core";

function getAccessToken() {
  return decryptAndRetrieve("fathy", "access_token");
}

export const addBook = createAsyncThunk(
  "booksSlice/addBook",
  async ([
    title,
    author,
    isbn,
    type,
    total_copies,
    available_copies,
    genres,
  ]) => {
    try {
      const access_token = getAccessToken();

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(apis.Librarian.Book.Add, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${access_token}`,
          },
          body: JSON.stringify({
            title: title,
            author: author,
            isbn: isbn,
            type: type,
            total_copies: parseInt(total_copies),
            available_copies: parseInt(available_copies),
            genreNames: genres,
          }),
        });

        let data = await res.json();

        if (data.success === true) {
          toast.success(data.msg);
          return data;
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }
);

export const filterBooks = createAsyncThunk(
  "booksSlice/filterBooks",
  async ([number, id, title, auther, isbn, type, libraryName]) => {
    try {
      const access_token = getAccessToken();

      let APIFilter = apis.Librarian.Book.Filter.replace(":number", number);
      if (id !== "") APIFilter += "book_id=" + id + "&";
      if (title !== "") APIFilter += "title=" + title + "&";
      if (auther !== "") APIFilter += "author=" + auther + "&";
      if (isbn !== "") APIFilter += "isbn=" + isbn + "&";
      if (type !== "") APIFilter += "type=" + type + "&";
      if (libraryName !== "") APIFilter += "library_name=" + libraryName + "&";

      let res = await fetch(APIFilter, {
        method: "POST",
        headers: { Authorization: `${access_token}` },
      });

      let data = await res.json();

      if (data.success === true) {
        toast.success(data.msg);
        console.log(data);
        return data;
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "booksSlice/deleteBook",
  async (genre_id) => {
    try {
      const access_token = getAccessToken();
      let res = await fetch(apis.Librarian.Book.Delete.replace(":id"), {
        method: "DELETE",
        headers: {
          Authorization: `${access_token}`,
        },
      });

      let data = await res.json();

      if (data.success === true) {
        toast.success(data.msg);
        return data;
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: null,
  page: null,
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  initialState: initialState,
  name: "booksSlice",
  reducers: {
    clearBook: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(filterBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload?.page;
        state.data = action.payload?.data;
      })
      .addCase(filterBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          return item.book_id != action.payload?.id;
        });
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { clearBook } = booksSlice.actions;
export default booksSlice.reducer;
