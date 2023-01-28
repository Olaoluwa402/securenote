import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import taskService, { createTaskProps } from "./taskService";
// import { logoutUser } from "../auth/authLoginSlice";

export interface createTaskInterface {
  Task: null;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: createTaskInterface = {
  Task: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const createTaskAction = createAsyncThunk(
  "createTask/createTaskAction",
  async ({ token, title, detail }: createTaskProps, thunkAPI) => {
    try {
      return await taskService.createTask({
        token,
        title,
        detail,
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // if (/jwt|unauthorized/gi.test(message)) {
      //   //dispatch logout
      //   thunkAPI.dispatch(logoutUser());
      // }

      toast.warning(`${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTask = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.Task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskAction.fulfilled, (state, action: any) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.Task = action.payload;
      })
      .addCase(createTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.Task = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = createTask.actions;

export default createTask.reducer;
