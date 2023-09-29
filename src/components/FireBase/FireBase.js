// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp9k6KPS_kHAMiNyDBV4mIlGGg6HUyyqU",
  authDomain: "log-in-demo-50aff.firebaseapp.com",
  projectId: "log-in-demo-50aff",
  storageBucket: "log-in-demo-50aff.appspot.com",
  messagingSenderId: "90556073993",
  appId: "1:90556073993:web:65f73e2fdabbe9c2ce10d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth  = getAuth(app);
export default auth;