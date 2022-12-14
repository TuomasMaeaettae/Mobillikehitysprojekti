import {initializeApp} from 'firebase/app';
import {getFirestore, addDoc, doc, collection, orderBy, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {getAuth, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
      } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBMu5d_yq7Df5qOWPHJy2w04Kqw_VPa_5w",
    authDomain: "mobillikehitysprojekti-11946.firebaseapp.com",
    projectId: "mobillikehitysprojekti-11946",
    storageBucket: "mobillikehitysprojekti-11946.appspot.com",
    messagingSenderId: "330233722632",
    appId: "1:330233722632:web:6106c585c4278f3a6edebd"
  };

  initializeApp(firebaseConfig);

  const firestore = getFirestore();

  const USERS = 'Users';
  const CLASSES = 'CLASSES';
  const VIESTI = 'Messages';
  
  export {
    firestore,
    addDoc,
    setDoc,
    getAuth,
    updateDoc,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    doc,
    collection,
    orderBy,
    serverTimestamp,
    USERS,
    CLASSES,
    VIESTI
  };