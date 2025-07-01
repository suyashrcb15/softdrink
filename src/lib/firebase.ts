// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSC4HpgerPbxiaEdZ_wnMZkSZRpVtO2KI",
    authDomain: "drink-28591.firebaseapp.com",
    projectId: "drink-28591",
    storageBucket: "drink-28591.appspot.com",
    messagingSenderId: "173557751527",
    appId: "1:173557751527:web:433f0caf56fdb78e364c42",
    measurementId: "G-4QVR7NLF7L"
};

const app = initializeApp(firebaseConfig);

// ✅ THIS is the important export that fixes your build error
export const db = getFirestore(app);
