import { createSlice } from "@reduxjs/toolkit"
import { ref, set } from 'firebase/database';
import database from "../firebase/firebase";

const formSlice = createSlice({
  name: 'formData',
  initialState: {
    myInfo: {
      name: '',
      address: ''
    },
    updated: false,
  },
  reducers: {
    setFormData: (state, action) => {
      state.myInfo = action.payload
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
    }
  }
})

export const { setFormData, setUpdated } = formSlice.actions;
export const selectMyInfo = (state) => state.formData.myInfo;
export const selectUpdated = (state) => state.formData.updated;
export default formSlice.reducer;

//Action to upload data to database

export const uploadFormData = (formData) => async (dispatch) => {
  try {
    console.log("adding profile");
    dispatch(setFormData(formData));
    dispatch(setUpdated(true));

    setTimeout(() => {
      dispatch(setUpdated(false));
    }, 4000);

    const dbRef = ref(database, 'profile/');
    await set(dbRef, formData);
    console.log("profile added");
  } catch (error) {
    console.error("Error uploading data", error);
  }
}
