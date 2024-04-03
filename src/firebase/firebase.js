import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIfP70MWowNhkpp1r7d2tZ9_HwP_WSGMs",
  authDomain: "redux-image-render.firebaseapp.com",
  projectId: "redux-image-render",
  storageBucket: "redux-image-render.appspot.com",
  messagingSenderId: "190478963504",
  appId: "1:190478963504:web:6ff8f703bfb2ef2eca6ef5",
  measurementId: "G-M2TVG73GCK",
  databaseURL: "https://redux-image-render-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { storage, app, database as default };