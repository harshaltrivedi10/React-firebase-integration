import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBmGlwjStzMJTM_kVLxwkXfXCNszan9iXQ',
  authDomain: 'think-piece-live-7205d.firebaseapp.com',
  databaseURL: 'https://think-piece-live-7205d.firebaseio.com',
  projectId: 'think-piece-live-7205d',
  storageBucket: 'think-piece-live-7205d.appspot.com',
  messagingSenderId: '76123959608',
  appId: '1:76123959608:web:16dc8291ce3d6071d7d1cd',
  measurementId: 'G-3ZK2B15YCS'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOutFromGoogle = () => {
  console.log('In logout');
  auth.signOut();
};
window.firebase = firebase;

export const storage = firebase.storage();

export const createUserProfileDocument = async (user, additionalData) => {
  // if there is no user, you cannot move forward
  if (!user) return;

  // check if there's already a document for this user, if so don't make a new one
  //  Get a reference to a location/document in the database where this user's profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the data from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      // set a uid
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.log('Error fetching user', error.message);
  }
};

export default firebaseConfig;
