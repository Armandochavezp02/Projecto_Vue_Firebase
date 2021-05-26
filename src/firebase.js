import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBpjN3gRXmKtUuV997CoJUGpJkaaU7eTbE",
    authDomain: "vue-paradigmas-de-programacion.firebaseapp.com",
    projectId: "vue-paradigmas-de-programacion",
    storageBucket: "vue-paradigmas-de-programacion.appspot.com",
    messagingSenderId: "464581192225",
    appId: "1:464581192225:web:094426b203fa50490c1160"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()