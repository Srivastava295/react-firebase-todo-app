import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCyOWzS-m-Q37hGp0TEiCBRTVL6SS9yD70",
    authDomain: "todo-app-8cc47.firebaseapp.com",
    databaseURL: "https://todo-app-8cc47.firebaseio.com",
    projectId: "todo-app-8cc47",
    storageBucket: "todo-app-8cc47.appspot.com",
    messagingSenderId: "42373561997",
    appId: "1:42373561997:web:a71411f53cf085e276ecc4"
});

const db = firebaseConfig.firestore();

export default db;