import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  writerPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    setWriterPost: (state, action) => {
      state.writerPosts = action.payload;
    },
  },
});

export const { setPost, setWriterPost } = postsSlice.actions;

export default postsSlice.reducer;
