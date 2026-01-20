import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../../../api/axios";

const saved = JSON.parse(localStorage.getItem("auth") || "null");
if (saved?.token) setAuthToken(saved.token);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", payload);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Register failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data; // -------------{token, user}------------
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: saved?.token || null,
    user: saved?.user || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("auth");
      setAuthToken(null);
    },
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: s.token, user: s.user }),
        );
        setAuthToken(s.token);
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })

      .addCase(registerUser.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s) => {
        s.status = "succeeded";
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
