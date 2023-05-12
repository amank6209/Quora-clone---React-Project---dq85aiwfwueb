import firebase from "firebase";



const firebaseConfig = {
  apiKey: "AIzaSyBA3ulpfggax6kp2uiHLHBR6Rl-tb8SX0k",
  authDomain: "quora-clone-5aaf8.firebaseapp.com",
  projectId: "quora-clone-5aaf8",
  storageBucket: "quora-clone-5aaf8.appspot.com",
  messagingSenderId: "600441480694",
  appId: "1:600441480694:web:c102303377fb7439ca13d7",
  measurementId: "G-DLKCTP2FLD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;
