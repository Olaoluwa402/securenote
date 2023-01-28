import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import taskService, { updateTaskProps } from "./taskService";
// import { logoutUser } from "../auth/authLoginSlice";

export interface updateTaskInterface {
  task: null;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: updateTaskInterface = {
  task: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const updateTaskAction = createAsyncThunk(
  "updateTask/updateTaskAction",
  async ({ id, token, title, detail }: updateTaskProps, thunkAPI) => {
    try {
      return await taskService.updateTask({
        id,
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
      toast.warning(`${message}`);

      // if (/jwt|unauthorized/gi.test(message)) {
      //   //dispatch logout
      //   thunkAPI.dispatch(logoutUser());
      // }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createSlice({
  name: "updateTask",
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
      .addCase(updateTaskAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskAction.fulfilled, (state, action: any) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.task = action.payload;
      })
      .addCase(updateTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.task = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = updateTask.actions;

export default updateTask.reducer;
