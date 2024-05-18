
import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB9k9dN2uL7OdxSErCOomd6uf7vLge3-A",
    authDomain: "expensecalculator3.firebaseapp.com",
    projectId: "expensecalculator3",
    storageBucket: "expensecalculator3.appspot.com",
    messagingSenderId: "213715114389",
    appId: "1:213715114389:web:d8860848eea94ce0497e9c",
    measurementId: "G-2HWY435VDZ"
  };
  //  initializeApp
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   export const auth = getAuth(app);
   export default db;