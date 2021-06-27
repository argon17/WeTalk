// import firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBIrIcDMj0X9oM7Xd8KOJ8tpny2SyQDbeA",
    authDomain: "wetalk-argon17.firebaseapp.com",
    databaseURL: "https://wetalk-argon17-default-rtdb.firebaseio.com",
    projectId: "wetalk-argon17",
    storageBucket: "wetalk-argon17.appspot.com",
    messagingSenderId: "473443794549",
    appId: "1:473443794549:web:aa9948674228b39bce823c"
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