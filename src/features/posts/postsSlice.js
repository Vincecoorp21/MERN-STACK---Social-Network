import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postService';

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
};

export const getAllWith = createAsyncThunk('posts/getAllWith', async () => {
  try {
    return await postsService.getAllWith();
  } catch (error) {
    console.error(error);
  }
});
export const getById = createAsyncThunk('posts/getById', async id => {
  try {
    return await postsService.getById(id);
  } catch (error) {
    console.error(error);
  }
});
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (_id, thunkAPI) => {
    try {
      return await postsService.deletePost(_id);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post, thunkAPI) => {
    try {
      return await postsService.createPost(post);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllWith.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllWith.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        post => post._id !== +action.payload._id
      );
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
