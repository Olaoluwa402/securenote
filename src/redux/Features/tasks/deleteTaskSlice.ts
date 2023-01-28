import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import taskService, { deleteTaskProps } from "./taskService";
// import { logoutUser } from "../auth/authLoginSlice";

export interface deleteTaskInterface {
  task: null;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: deleteTaskInterface = {
  task: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const deleteTaskAction = createAsyncThunk(
  "deleteTask/deleteTaskAction",
  async ({ id, token }: deleteTaskProps, thunkAPI) => {
    try {
      return await taskService.deleteTask({
        id,
        token,
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.warning(`${message}`);

      // if (/jwt|unauthorized/gi.test(message)) {
      //   //dispatch logout
      //   thunkAPI.dispatch(logoutUser());
      // }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createSlice({
  name: "deleteTask",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTaskAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskAction.fulfilled, (state, action: any) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.task = action.payload;
      })
      .addCase(deleteTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.task = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = deleteTask.actions;

export default deleteTask.reducer;
