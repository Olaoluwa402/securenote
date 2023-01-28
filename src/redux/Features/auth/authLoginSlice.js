import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";

//get user from local storage if it exist
let userFromStorage = null;
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  const local = localStorage.getItem("user");
  userFromStorage = localStorage.getItem("user") ? JSON.parse(local) : null;
}

const initialState = {
  user: null,
  userStored: userFromStorage,
  loading: false,
  error: false,
  success: false,
  message: "",
};

// Login user
export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async ({ email, password }, thunkAPI) => {
    try {
      return await authService.login({ email, password });
    } catch (error) {
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({}, thunkAPI) => {
    toast.success(`Succefully logged out`);
    return await authService.logout();
  }
);

export const authLoginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {
    //non asynchronous reducers goes here
    resetUser: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
      state.user = null;
      state.userStored = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userStored = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetUser } = authLoginSlice.actions;

export default authLoginSlice.reducer;
