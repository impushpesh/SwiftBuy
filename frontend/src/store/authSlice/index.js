import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpUser,
  signInUser,
  checkAuth,
  signOutUser,
} from "../../services/AuthApi";
import { toast } from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
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

export const checkAuthStatus = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await checkAuth(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Error checking auth status");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signOutUser();
      toast.success("Logout successful!");
      return response;
    } catch (error) {
      toast.error(error.message || "Logout failed!");
      return rejectWithValue(error.message || "Logout failed!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
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
      console.log(action.payload.data)
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
      state.token = action.payload.token;
      sessionStorage.setItem('token', JSON.stringify(action.payload.token));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    });
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload.success;
      state.user = action.payload.success ? action.payload.user : null;
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
