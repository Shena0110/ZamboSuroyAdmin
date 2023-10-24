import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAhW4xKZQmbiBNeOSAWmysy-sgmgRIQWtE",
    authDomain: "zambosuroy-621ce.firebaseapp.com",
    projectId: "zambosuroy-621ce",
    storageBucket: "zambosuroy-621ce.appspot.com",
    messagingSenderId: "94330551531",
    appId: "1:94330551531:web:a9824a538fa6e4cb2252ae",
    measurementId: "G-LK1YJ38STN"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  
  export const db = firebase.firestore();
  export { firebase, auth, firestore, storage };

  //ANDROID = 94330551531-bugvi6v2qtgav4n1368hv9n7aql2ukhe.apps.googleusercontent.com