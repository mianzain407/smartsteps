// Import only the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCa1u6suQriGtkke5J8quBCybrTqdjZ6Y",
  authDomain: "smartsteps-74e16.firebaseapp.com",
  projectId: "smartsteps-74e16",
  storageBucket: "smartsteps-74e16.firebasestorage.app",
  messagingSenderId: "583167768069",
  appId: "1:583167768069:web:af632d6e578f92b1218e6c",
  measurementId: "G-8Y7090P76E",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
