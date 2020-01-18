import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB9CW5nhyI6yxKvu8P-ar33t-I0yfdlYLc',
  authDomain: 'crown-db-1f5bc.firebaseapp.com',
  databaseURL: 'https://crown-db-1f5bc.firebaseio.com',
  projectId: 'crown-db-1f5bc',
  storageBucket: 'crown-db-1f5bc.appspot.com',
  messagingSenderId: '951414849828',
  appId: '1:951414849828:web:fc954835f9af51156973b1',
  measurementId: 'G-SFYKM1PM22'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
