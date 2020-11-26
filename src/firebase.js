import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB-2Jpw3hjVr1nvgQFOoNA5S0LRMvmlr-E",
  authDomain: "invernaderoadruino.firebaseapp.com",
  databaseURL: "https://invernaderoadruino.firebaseio.com",
  projectId: "invernaderoadruino",
  storageBucket: "invernaderoadruino.appspot.com",
  messagingSenderId: "717730876107",
  appId: "1:717730876107:web:6904b195b80463b32ae94e",
  measurementId: "G-5DV1GNWJ2G"
};
// Initialize Firebase
let fireDb = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fireDb.database().ref();
