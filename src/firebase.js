import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAhBMPgWil2u_-XrZ9c1tFkaPNpRtrPOEQ",
    authDomain: "overlooked-a6658.firebaseapp.com",
    databaseURL: "https://overlooked-a6658.firebaseio.com",
    projectId: "overlooked-a6658",
    storageBucket: "",
    messagingSenderId: "89816885139"
  };
firebase.initializeApp(config);

export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;