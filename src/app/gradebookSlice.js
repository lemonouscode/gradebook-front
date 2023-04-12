import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import gradebookService from '../services/GradebookService'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (arg, thunkAPI) => {
  const response = await gradebookService.getGradebooks(arg);
  // console.log(response)
  return response
})

//addGradebook
export const fetchAddGradebook = createAsyncThunk('posts/fetchAddGradebook', async (arg, thunkAPI) => {
    const response = await gradebookService.addGradebook(arg);
    // console.log(response)
    return response
  })

const gradebookSlice = createSlice({
    name: 'gradebooks',
    initialState: {
        posts: [],
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        current_page: 1,
        last_page: 1,
      },
    reducers: {
        gradebookAdded: {
            reducer(state, action) {
                // state = action.payload;
                state.push(action.payload);
                // action.payload.data = [...state.data.data, ...action.payload.data];
            },
            
        },
    },
    extraReducers(builder) {
      builder
          .addCase(fetchPosts.pending, (state, action) => {
              state.status = 'loading'
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
              state.status = 'succeeded'

              // Add any fetched posts to the array
             
              // state.posts = action.payload.data; 
              state.posts.push(...action.payload.data); 

              // action.payload.data = [...state.data.data, ...action.payload.data];

              state.current_page = action.payload.current_page
              state.last_page = action.payload.last_page
          })
          .addCase(fetchPosts.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message
          })
          .addCase(fetchAddGradebook.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchAddGradebook.fulfilled, (state, action) => {
                state.status = 'succeeded'

                // Add any fetched posts to the array
            
                console.log(action)

                // state.posts = action.payload.data; 
                state.posts.push(action.payload); 

          })
          .addCase(fetchAddGradebook.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
          })

  }
})


export const selectAllGradebooks = (state) => state.gradebooks.posts;
export const selectPageObject = (state) => state.gradebooks;
export const getPostsStatus = (state) => state.gradebooks.status;
export const getPostsError = (state) => state.gradebooks.error;
// export const selectAllGradebooks = (state) => state.gradebooks.data;

export const { gradebookAdded } = gradebookSlice.actions

export default gradebookSlice.reducer