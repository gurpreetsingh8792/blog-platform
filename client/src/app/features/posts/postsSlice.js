import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (params, thunkAPI) => {
    try {
      const res = await api.get("/posts", { params });
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to load posts");
    }
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchOne",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to load post");
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/posts", payload);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Create failed",
      );
    }
  },
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/posts/${id}`, data);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Update failed",
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/posts/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Delete failed",
      );
    }
  },
);

export const addComment = createAsyncThunk(
  "posts/comment",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.post(`/posts/${id}/comments`, data);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Comment failed",
      );
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchPosts.fulfilled, (s, a) => {
      s.list = a.payload;
    })
      .addCase(fetchPostById.fulfilled, (s, a) => {
        s.current = a.payload;
      })
      .addCase(createPost.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      })
      .addCase(updatePost.fulfilled, (s, a) => {
        s.list = s.list.map((p) => (p._id === a.payload._id ? a.payload : p));
        if (s.current?._id === a.payload._id) s.current = a.payload;
      })
      .addCase(deletePost.fulfilled, (s, a) => {
        s.list = s.list.filter((p) => p._id !== a.payload);
        if (s.current?._id === a.payload) s.current = null;
      })
      .addCase(addComment.fulfilled, (s, a) => {
        s.current = a.payload;
      });
  },
});

export default postsSlice.reducer;
