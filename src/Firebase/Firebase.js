// import firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBZfDb1p9Yp-C1wXP7uuCRA_u8jOAfWljQ",
    authDomain: "wetalk-chatapp.firebaseapp.com",
    projectId: "wetalk-chatapp",
    storageBucket: "wetalk-chatapp.appspot.com",
    messagingSenderId: "414296379358",
    appId: "1:414296379358:web:550cf82666fc334cf5d74f",
    measurementId: "G-1MLMS9RXCC"
};

// initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firestore instance
const db = firebaseApp.firestore();
// Authentication Handler
const auth = firebase.auth();
// Storage instance
const storage = firebase.storage();
//Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };