import { configureStore } from "@reduxjs/toolkit";
import imageReducer from './imageSlice';
import formReducer from './formSlice'

const store = configureStore({
  reducer: {
    images: imageReducer,
    formData: formReducer
  }
})

export default store;