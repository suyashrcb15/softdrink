// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4hp5reILPLh4ZIuS3aCM3-xXseAMnF-U",
    authDomain: "softdrink-fb1b9.firebaseapp.com",
    projectId: "softdrink-fb1b9",
    storageBucket: "softdrink-fb1b9.firebasestorage.app",
    messagingSenderId: "453417647438",
    appId: "1:453417647438:web:7e179229d6f8550db3b21f",
    measurementId: "G-PJ0MJG64C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);