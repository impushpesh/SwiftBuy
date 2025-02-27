import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser, signInUser } from "../../services/AuthApi";
import { toast } from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await signUpUser(formData);
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed!");
      return rejectWithValue(error.message || "Registration failed!");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await signInUser(formData);
      toast.success("Login successful!");
      return response;
    } catch (error) {
      toast.error(error.message || "Login failed!");
      return rejectWithValue(error.message || "Login failed!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action);

      state.isLoading = false;
      state.user = action.payload.user
      state.isAuthenticated = action.payload.success;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
