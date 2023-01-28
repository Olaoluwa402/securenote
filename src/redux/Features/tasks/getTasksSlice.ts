import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import taskService, { getTaskProps } from "./taskService";
import { logoutUser } from "../auth/authLoginSlice";

export interface getTaskInterface {
  tasks: null;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: getTaskInterface = {
  tasks: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const getTasksAction = createAsyncThunk(
  "getTasks/getTasksAction",
  async ({ token, search }: getTaskProps, thunkAPI) => {
    try {
      return await taskService.getTasks({
        token,
        search,
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (/jwt|unauthorized/gi.test(message)) {
        //dispatch logout
        thunkAPI.dispatch(logoutUser());
      }
      toast.warning(`${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTasks = createSlice({
  name: "getTasks",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.tasks = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksAction.fulfilled, (state, action: any) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasksAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.tasks = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = getTasks.actions;

export default getTasks.reducer;
