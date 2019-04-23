import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClXVRGMKHwJwLsUqyzbtyjGkfKhotM5Pk",
    authDomain: "event-radiator.firebaseapp.com",
    databaseURL: "https://event-radiator.firebaseio.com",
    projectId: "event-radiator",
    storageBucket: "event-radiator.appspot.com",
    messagingSenderId: "236164602886"
  };

firebase.initializeApp(config);

export default firebase;