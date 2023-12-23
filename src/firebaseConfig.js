import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

console.log(process.env.REACT_APP_API_KEY);
const firebaseConfig = {
    apiKey: "AIzaSyBAruPycg5wBwTZKkad1StLIzpoZ3UZaGo",
    authDomain: "typing-4551c.firebaseapp.com",
    projectId: "typing-4551c",
    storageBucket: "typing-4551c.appspot.com",
    messagingSenderId: "630627239320",
    appId: "1:630627239320:web:aeb709313d892ada5a17ed",
    measurementId: "G-GD9GXNXKB7"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db }