// Import the functions you need from the SDKs you need
import { initializeApp,fir } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBPpRJOm4kv4AckspKero3PRIsC4UFGo",
  authDomain: "autheticate-49e05.firebaseapp.com",
  projectId: "autheticate-49e05",
  storageBucket: "autheticate-49e05.appspot.com",
  messagingSenderId: "1079452523481",
  appId: "1:1079452523481:web:86d11fd1028e6653e997c8"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
 const auth = getAuth(fire);
const db=getFirestore();
export default fire;
export {auth,db};