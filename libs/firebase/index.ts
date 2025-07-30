// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcGAEDOvYdB_RzvpjrNGOd4whyfGJPSe0",
  authDomain: "utopia-64d38.firebaseapp.com",
  projectId: "utopia-64d38",
  storageBucket: "utopia-64d38.firebasestorage.app",
  messagingSenderId: "428280626242",
  appId: "1:428280626242:android:3939ace2ea2fd7648f41db",
  clientId: "428280626242-en4m3ccn0bjsd5fkddrct6vp6nqo72kg.apps.googleusercontent.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
