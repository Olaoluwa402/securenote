import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MyBool } from "../../../components/Types";
import authService from "./authService";
import { updateProfileProps } from "./authService";
// import { logout } from "./authLoginSlice";
import { loginAction } from "./authLoginSlice";

export interface updateProfileInterface {
  profile: any;
  loading: MyBool;
  error: MyBool;
  success: MyBool;
  message: any;
}

const initialState: updateProfileInterface = {
  profile: null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

// Register user
export const updateProfileAction = createAsyncThunk(
  "auth/updateProfileAction",
  async ({ token, formData, id }: any, thunkAPI) => {
    try {
      const data = await authService.updateProfile({ token, formData, id });

      thunkAPI.dispatch({ type: "auth/loginAction/fulfilled", payload: data });

      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // if (/jwt|unauthenticated/gi.test(message)) {
      //   //dispatch logout
      //   thunkAPI.dispatch(logout());
      // }

      toast.warning(`${message}`);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        // if (action.type === "HYDRATE") {
        // }
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.profile = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = updateProfile.actions;

export default updateProfile.reducer;
