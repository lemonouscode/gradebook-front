import { configureStore } from '@reduxjs/toolkit'
import gradebookSlice from './gradebookSlice'
import teacherSlice from './teacherSlice'

export const store = configureStore({
  reducer: {
    gradebooks:gradebookSlice,
    teachers:teacherSlice
  },
})

