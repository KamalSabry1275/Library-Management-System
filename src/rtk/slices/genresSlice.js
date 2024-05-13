import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis, routes } from "../../components/URLs";
import { jwtDecode } from "jwt-decode";
import { decryptAndRetrieve } from "./authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function getAccessToken() {
  return decryptAndRetrieve("fathy", "access_token");
}

export const fetchGenres = createAsyncThunk(
  "genresSlice/fetchGenres",
  async () => {
    try {
      const access_token = getAccessToken();
      // const access_token = "getAccessToken()";

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(apis.Librarian.Genre.All, {
          // let res = await fetch(`http://localhost:9000/genres`, {
          method: "GET",
          headers: {
            Authorization: `${access_token}`,
          },
        });

        let data = await res.json();
        if (data.success === true) {
          // navigate(routes.Home);
          toast.success(data.msg);
          return data;
        } else {
          toast.error(data.msg);
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addGenre = createAsyncThunk(
  "genresSlice/addGenre",
  async (genres) => {
    try {
      const access_token = getAccessToken();
      // const access_token = "kjkjbjk";

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(apis.Librarian.Genre.Add, {
          // let res = await fetch("http://localhost:9000/genres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${access_token}`,
          },
          body: JSON.stringify({
            names: genres,
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

export const deleteGenre = createAsyncThunk(
  "genresSlice/deleteGenre",
  async (genre_id) => {
    try {
      const access_token = getAccessToken();
      // const access_token = "11";
      let res = await fetch(
        apis.Librarian.Genre.Delete.replace(":id", genre_id),
        {
          // let res = await fetch(`http://localhost:9000/genres/${genre_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `${access_token}`,
          },
        }
      );

      let data = await res.json();

      if (data.success === true) {
        toast.success(data.msg);
        // return data;
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
  loading: false,
  error: null,
};

export const genresSlice = createSlice({
  initialState: initialState,
  name: "genresSlice",
  reducers: {
    clearProject: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        // state.data = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(addGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(addGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(deleteGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { clearProject } = genresSlice.actions;
export default genresSlice.reducer;
