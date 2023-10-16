import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB240Kr8csKMJxz5_baze_kodcibrA7-Ok",
    authDomain: "to-do-app-ef159.firebaseapp.com",
    projectId: "to-do-app-ef159",
    storageBucket: "to-do-app-ef159.appspot.com",
    messagingSenderId: "339014603343",
    appId: "1:339014603343:web:999bdefec0aaf83809903a",
    measurementId: "G-2RPNWJRCL8"
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// can be accessed from other files
export { db };