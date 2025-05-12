import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3kVxO4v-sFboKgzeWUzGNRla_S_t4vg4",
    authDomain: "library-83b89.firebaseapp.com",
    projectId: "library-83b89",
    storageBucket: "library-83b89.appspot.com",
    messagingSenderId: "892863330475",
    appId: "1:892863330475:web:88971258fb6f914a33dfee",
    measurementId: "G-VXRJPTCZY0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider};







