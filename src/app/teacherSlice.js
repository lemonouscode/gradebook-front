import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import teacherService from '../services/TeacherService';


export const fetchTeachers = createAsyncThunk('posts/fetchTeachers', async (arg, thunkAPI) => {
    const response = await teacherService.getGradebooks(arg);
    // console.log(response)
    return response
  })


  export const fetchSingleTeacher = createAsyncThunk('posts/fetchSingleTeacher', async (arg, thunkAPI) => {
    const response = await teacherService.getSingleTeacher(arg);
    // console.log(response)
    return response
  })
  
//   getTeachersWithoutGradebook
export const fetchTeachersWithoutGradebook = createAsyncThunk('posts/fetchTeachersWithoutGradebook', async (arg, thunkAPI) => {
    const response = await teacherService.getTeachersWithoutGradebook(arg);
    // console.log(response)
    return response
  })

const teacherSlice = createSlice({
    name: 'teachers',
    initialState: {
        posts: [],
        singleTeacher: [],
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        current_page: 1,
        last_page: 1,
        slStatus : 'idle',
        teachersWithoutGradebook: [],
        tlStatus: 'idle'
      },
    reducers: {
        teacherAdded: {
            reducer(state, action) {
                // state = action.payload;
                state.push(action.payload);
                // action.payload.data = [...state.data.data, ...action.payload.data];
            },
            
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTeachers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.status = 'succeeded'
  
                // Add any fetched posts to the array
               
                // state.posts = action.payload.data; 
                state.posts.push(...action.payload.data); 
  
                // action.payload.data = [...state.data.data, ...action.payload.data];
  
                state.current_page = action.payload.current_page
                state.last_page = action.payload.last_page
            })
            .addCase(fetchSingleTeacher.pending, (state, action) => {
                state.slStatus = 'loading'
            })
            .addCase(fetchSingleTeacher.fulfilled, (state, action) => {
                state.slStatus = 'succeeded'
                // state.singleTeacher.push(action.payload); 

                state.singleTeacher = action.payload;
            })
            .addCase(fetchTeachersWithoutGradebook.pending, (state, action) => {
                state.tlStatus = 'loading'
            })
            .addCase(fetchTeachersWithoutGradebook.fulfilled, (state, action) => {
                state.tlStatus = 'succeeded'
                // state.singleTeacher.push(action.payload); 

                state.teachersWithoutGradebook = action.payload;
            })
            
  
    }
    
})

export const selectAllGradebooks = (state) => state.teachers.posts;
export const selectPageObject = (state) => state.teachers;
export const getPostsStatuss = (state) => state.teachers.status;
export const getPostsError = (state) => state.teachers.error;
export const getSingleTeacher = (state) => state.teachers.singleTeacher;
export const getSlStatus = (state) => state.teachers.slStatus;

export const selectTeachersWithoutGradebook = (state) => state.teachers.teachersWithoutGradebook;
export const getTeacherStatus = (state) => state.teachers.tlStatus;

export const { teacherAdded } = teacherSlice.actions

export default teacherSlice.reducer