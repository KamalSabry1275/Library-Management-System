import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchModules = createAsyncThunk(
  "modulesSlice/fetchModules",
  async () => {
    const res = await fetch("http://localhost:9000/modules");
    return await res.json();
  }
);

export const modulesSlice = createSlice({
  initialState: [],
  name: "modulesSlice",
  reducers: {
    // plusModule: (state, action) => {
    //   state.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModules.fulfilled, (state, action) => action.payload);
    // builder.addCase(addProject.fulfilled, (state, action) => action.payload);
  },
});

export const {} = modulesSlice.actions;
export default modulesSlice.reducer;
