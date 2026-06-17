import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfilnq3EXpYCskAQfCjhRQz7vkpLqRUiY",
  authDomain: "houda-portfolio.firebaseapp.com",
  projectId: "houda-portfolio",
  storageBucket: "houda-portfolio.firebasestorage.app",
  messagingSenderId: "152068773292",
  appId: "1:152068773292:web:fda1f726ca826e2f7a9609",
  measurementId: "G-382377T2FX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;