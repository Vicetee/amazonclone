// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcvSR7J431lXRQT3irHikilka4OsJUIM8",
  authDomain: "vicetee-2fed4.firebaseapp.com",
  projectId: "vicetee-2fed4",
  storageBucket: "vicetee-2fed4.appspot.com",
  messagingSenderId: "827226570750",
  appId: "1:827226570750:web:585974bd612a3534674aaf",
  measurementId: "G-Y3L8ZBBXLH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;