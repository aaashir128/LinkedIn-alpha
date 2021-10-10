import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDk-mUE9u1DAuMfo8r7eKlSGYUP7W7l26o",
  authDomain: "linkedin-alpha.firebaseapp.com",
  projectId: "linkedin-alpha",
  storageBucket: "linkedin-alpha.appspot.com",
  messagingSenderId: "131222996751",
  appId: "1:131222996751:web:dd19e12128b5fc85a2e07a",
  measurementId: "G-C0RYYVGFDE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
