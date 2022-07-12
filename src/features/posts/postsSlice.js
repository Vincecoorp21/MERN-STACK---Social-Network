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

export const like = createAsyncThunk('products/like', async _id => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk('products/dislike', async _id => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (post, thunkAPI) => {
    try {
      return await postsService.updatePost(post);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostByName = createAsyncThunk(
  'posts/getPostByName',
  async title => {
    try {
      console.log('comprobando Slice 2', title);
      return await postsService.getPostByName(title);
    } catch (error) {
      console.error(error);
    }
  }
);
export const deletePostAdmin = createAsyncThunk(
  'posts/deletePostAdmin',
  async (_id, thunkAPI) => {
    try {
      return await postsService.deletePostAdmin(_id);
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
    builder.addCase(like.fulfilled, (state, action) => {
      console.log('slice', action.payload);
      const posts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
        return post;
      });
      state.posts = posts;
    });
    builder.addCase(dislike.fulfilled, (state, action) => {
      const posts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
        return post;
      });
      state.posts = posts;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      console.log('marcador editpOst', action.payload);
      const posts = state.posts.posts?.map(el => {
        console.log('mira aquí 1', el);
        if (el._id === action.payload.post._id) {
          el = action.payload.post;
        }
        console.log('mira aquí 2', el);
        return posts;
      });
      state.posts = posts;
    });
    builder.addCase(getPostByName.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(deletePostAdmin.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        post => post._id !== +action.payload._id
      );
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
