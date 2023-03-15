// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFM1B5XvveYa46RAJ_bqt0sqZW52013jE",
    authDomain: "k-pop-buddy.firebaseapp.com",
    projectId: "k-pop-buddy",
    storageBucket: "k-pop-buddy.appspot.com",
    messagingSenderId: "726174027132",
    appId: "1:726174027132:web:15071db759efab5a0f68f9",
    databaseURL: 'https://k-pop-buddy-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

export default async () => {
    const app = initializeApp(firebaseConfig);

    // Validation that our service structure is working
    // with an initialize Firebase application and auth instance.
    console.log('Firebase App Instantiation:', app)
    console.log('Firebase Auth Module:', getAuth(app))
}