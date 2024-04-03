import { createSlice } from '@reduxjs/toolkit';
import storage from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    imageList: [],
    isFetching: false,
    uploaded: false
  },
  reducers: {
    uploadImage: (state, action) => {
      state.imageList.push(action.payload);
    },
    setImages: (state, action) => {
      state.imageList = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setIsUploaded: (state, action) => {
      state.uploaded = action.payload;
    }
  }
})

//Async action for uploading image to firebase storage
export const uploadImageAsync = (imageFile) => async (dispatch) => {
  try {
    const imageRef = ref(storage, 'images/'+ Date.now() + imageFile.name);

    dispatch(setIsFetching(true));

    await uploadBytesResumable(imageRef, imageFile).then((snapshot) => {

      dispatch(setIsFetching(false));

      dispatch(setIsUploaded(true));
    })
    const imageUrl = await getDownloadURL(imageRef);

    dispatch(uploadImage(imageUrl));
    
    setTimeout(() => {
      dispatch(setIsUploaded(false));
    }, 7000);
  } catch (error) {
    console.error('Error uploading image:', error.message);
    dispatch(setIsFetching(false));
  }
}

export const { uploadImage, setImages, setIsFetching, setIsUploaded } = imageSlice.actions;
export const selectImages = (state) => state.images.imageList;
export const selectIsFetching = (state) => state.images.isFetching;
export const selectIsUploaded = (state) => state.images.uploaded;

export default imageSlice.reducer;