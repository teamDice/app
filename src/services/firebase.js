import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBYn8J0Q_-bGfqbb2yRewq71PG-y4bFAgc',
  authDomain: 'snakes-game-2b62c.firebaseapp.com',
  databaseURL: 'https://snakes-game-2b62c.firebaseio.com',
  projectId: 'snakes-game-2b62c',
  storageBucket: 'snakes-game-2b62c.appspot.com',
  messagingSenderId: '228033163810'
};

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();