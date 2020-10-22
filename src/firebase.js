import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBK-x-cH3fAtF1IdwI8GiVCctUp95QML-E",
  authDomain: "clone-20e78.firebaseapp.com",
  databaseURL: "https://clone-20e78.firebaseio.com",
  projectId: "clone-20e78",
  storageBucket: "clone-20e78.appspot.com",
  messagingSenderId: "656736848739",
  appId: "1:656736848739:web:10414eb6b2052f0a712156",
  measurementId: "G-22Q7CBZBVR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
