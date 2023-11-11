// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "webcar-74377.firebaseapp.com",
  projectId: "webcar-74377",
  storageBucket: "webcar-74377.appspot.com",
  messagingSenderId: "1011553737498",
  appId: "1:1011553737498:web:0a5dc96fea94579ecb2aa3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
