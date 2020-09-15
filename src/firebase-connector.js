import firebase from "firebase";

// Replace this file name with firebase.js

const firebaseConfig = firebase.initializeApp({
    apiKey: "your api key",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "app-db.firebaseio.com",
    projectId: "project-id",
    storageBucket: "your-app-storage-bucket.appspot.com",
    messagingSenderId: "message-sender-id",
    appId: "your-app-id"
});

const db = firebaseConfig.firestore();

export default db;