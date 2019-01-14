import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAtR1KekKeWc0qO-QL-xVdaWhnoKMd2MHs',
  authDomain: 'ritual-3b207.firebaseapp.com',
  databaseURL: 'https://ritual-3b207.firebaseio.com',
  projectId: 'ritual-3b207',
  storageBucket: 'ritual-3b207.appspot.com',
  messagingSenderId: '260790056150'
};

firebase.initializeApp(config);

export const db = firebase.database()
export const auth = firebase.auth()

export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
