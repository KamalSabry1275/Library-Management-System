import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "projrctsSlice/fetchProjects",
  async () => {
    const res = await fetch("http://localhost:9000/projects");
    return await res.json();
  }
);

export const addProject = createAsyncThunk(
  "projrctsSlice/addProject",
  async ([username, projectName, projectDate]) => {
    await fetch("http://localhost:9000/projects", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: "kamal21",
        projectName: projectName,
        projectDate: projectDate,
        description: "An IoT project for smart gardening",
        modules: [],
      }),
    });
  }
);

export const renameProject = createAsyncThunk(
  "projrctsSlice/renameProject",
  async ([projectID, projectName]) => {
    await fetch(`http://localhost:9000/projects/${projectID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        projectName: projectName,
      }),
    });
  }
);

export const deleteProject = createAsyncThunk(
  "projrctsSlice/deleteProject",
  async ([projectID, projectName]) => {
    await fetch(`http://localhost:9000/projects/${projectID}`, {
      method: "DELETE",
    });
  }
);

export const projectsSlice = createSlice({
  initialState: [],
  name: "projectsSlice",
  reducers: {
    // plusProject: (state, action) => {
    //   state.push(action.payload);
    // },
    plusModule: (state, action) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => action.payload);
    builder.addCase(addProject.fulfilled, (state, action) => action.payload);
    builder.addCase(renameProject.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteProject.fulfilled, (state, action) => action.payload);
  },
});

export const { plusModule } = projectsSlice.actions;
export default projectsSlice.reducer;
