import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import postsReducer from "../app/features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
