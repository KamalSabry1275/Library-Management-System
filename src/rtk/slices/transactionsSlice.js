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

export const fetchTransactions = createAsyncThunk(
  "transactionSlice/fetchTransactions",
  async (api) => {
    try {
      const access_token = getAccessToken();

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(api, {
          method: "POST",
          headers: {
            Authorization: `${access_token}`,
          },
        });

        let data = await res.json();
        console.log(data);
        if (data.success === true) {
          toast.success(data.msg);
          return data;
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const transactionConfirm = createAsyncThunk(
  "transactionSlice/transactionConfirm",
  async (api) => {
    try {
      const access_token = getAccessToken();

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(api, {
          method: "POST",
          headers: {
            Authorization: `${access_token}`,
          },
        });

        let data = await res.json();
        console.log(data);
        if (data.success === true) {
          toast.success(data.msg);
          return data;
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const transactionDelete = createAsyncThunk(
  "transactionSlice/transactionDelete",
  async (api) => {
    try {
      const access_token = getAccessToken();

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(api, {
          method: "DELETE",
          headers: {
            Authorization: `${access_token}`,
          },
        });

        let data = await res.json();
        console.log(data);
        if (data.success === true) {
          toast.success(data.msg);
          return data;
        } else {
          toast.error(data.msg);
        }
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

export const transactionsSlice = createSlice({
  initialState: initialState,
  name: "usersSlice",
  reducers: {
    clearTransactions: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        state.page = action.payload?.page;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(transactionConfirm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionConfirm.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(transactionConfirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(transactionDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionDelete.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(transactionDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
