import { initializeApp } from 'firebase/app'
<<<<<<< HEAD
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
=======
// import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
>>>>>>> fdc28d0de49daaae474a3bca0a7b0d9b4183f84b


const firebaseConfig = {
    apiKey: "AIzaSyAzhAnHqSEdSvGYaFnsz3P2A5gdU4-lBic",
    authDomain: "snapchat-clone-98b5b.firebaseapp.com",
    projectId: "snapchat-clone-98b5b",
    storageBucket: "snapchat-clone-98b5b.appspot.com",
    messagingSenderId: "720486454065",
    appId: "1:720486454065:web:2d5987c2ce64b28f2c9610"
};


const firebaseApp = initializeApp(firebaseConfig)
// const db = getFirestore(firebaseApp)
// const auth = getAuth(firebaseApp)
// const storage = getStorage(firebaseApp)
// const provider = new GoogleAuthProvider();

export default firebaseApp