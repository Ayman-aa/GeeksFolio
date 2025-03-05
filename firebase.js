import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0W0EV4uYiQmCwOWYrR7snJm2bB6dEGyI",
  authDomain: "geeksfolio.firebaseapp.com",
  projectId: "geeksfolio",
  storageBucket: "geeksfolio.firebasestorage.app",
  messagingSenderId: "96690261091",
  appId: "1:96690261091:web:45393df84470dec923fc56",
  measurementId: "G-1NHMXXRSL2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };