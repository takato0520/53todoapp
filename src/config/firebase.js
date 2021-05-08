import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBL-wvFER7dwaeSEIjCJ5ZcsrRs8UYxTDI",
  authDomain: "todoapp-4c0ba.firebaseapp.com",
  projectId: "todoapp-4c0ba",
  storageBucket: "todoapp-4c0ba.appspot.com",
  messagingSenderId: "157398747241",
  appId: "1:157398747241:web:65cbb5237ae4d826e97af8"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
