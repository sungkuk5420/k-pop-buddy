// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWAEqQv2xpIQjHpNQ6p9uCLy4BcZbxxE0",
    authDomain: "mygangnaminsider-9efc4.firebaseapp.com",
    databaseURL: "https://mygangnaminsider-9efc4-default-rtdb.firebaseio.com",
    projectId: "mygangnaminsider-9efc4",
    storageBucket: "mygangnaminsider-9efc4.appspot.com",
    messagingSenderId: "151747192131",
    appId: "1:151747192131:web:9da931e9ce5882f0e2bbf6",
    measurementId: "G-FEEJLRQNVP",
    messagingSenderId: "151747192131",
};

export default async () => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    // Validation that our service structure is working
    // with an initialize Firebase application and auth instance.
    console.log('Firebase App Instantiation:', app)
    console.log('Firebase Auth Module:', getAuth(app))
    console.log('analytics :', getAnalytics(app))
}