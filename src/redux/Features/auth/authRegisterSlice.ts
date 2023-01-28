import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import authService from "./authService";
import { registerProps } from "./authService";

export interface registerInterface {
  user: any;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: registerInterface = {
  user: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

// Register user
export const registerAction = createAsyncThunk(
  "auth/registerAction",
  async ({ email, password, name }: registerProps, thunkAPI) => {
    try {
      return await authService.register({
        email,
        password,
        name,
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.warning(`${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authRegisterSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authRegisterSlice.actions;

export default authRegisterSlice.reducer;
