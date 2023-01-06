import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCORg5CtF4a0oDblE1BVaCJMxpR0d4SyYk',
  authDomain: 'pokedex-35057.firebaseapp.com',
  projectId: 'pokedex-35057',
  storageBucket: 'pokedex-35057.appspot.com',
  messagingSenderId: '1017751435075',
  appId: '1:1017751435075:web:b5ffe4375d8395ad42a1f6',
  measurementId: 'G-WHEE4F9JRX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// Initialize Database
export const db = getDatabase(app);
