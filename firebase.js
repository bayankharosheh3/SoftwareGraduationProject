// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCDWASAytX8tZzqfBYQAuSU9DlrboFQhc",
    authDomain: "clinicchat-ab324.firebaseapp.com",
    projectId: "clinicchat-ab324",
    storageBucket: "clinicchat-ab324.appspot.com",
    messagingSenderId: "875392709966",
    appId: "1:875392709966:web:f28444d560d05459ac5a1f",
    measurementId: "G-C73EEJB9LP"
};

// Initialize Firebase
let app;
if (firebase.apps.length==0){
    app =firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app()
}
const db=firebase.firestore()
export {db};
//const app = initializeApp(firebaseConfig);