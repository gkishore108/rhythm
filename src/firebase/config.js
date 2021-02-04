import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB0aKEutnI5smykxz5zwZqVbespV6lFNE",
  authDomain: "rhythm-d04e4.firebaseapp.com",
  projectId: "rhythm-d04e4",
  storageBucket: "rhythm-d04e4.appspot.com",
  messagingSenderId: "700792989040",
  appId: "1:700792989040:web:d5b196385dc86ff2861bb5",
};

firebase.initializeApp(firebaseConfig);

const projetFireStore = firebase.firestore();

const projectAuth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projetFireStore, projectAuth, timestamp };
