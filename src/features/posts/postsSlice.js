import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postService';

const initialState = {
  posts: [],
};

export const getAllWith = createAsyncThunk('posts/getAllWith', async () => {
  try {
    return await postsService.getAllWith();
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllWith.fullfilled, (state, action) => {
      state.pots = action.payload;
    });
    builder.addCase(getAllWith.pending, state => {
      state.isLoading = true;
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
