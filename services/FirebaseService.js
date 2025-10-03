import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(path);
    await ref.put(blob);
    return await ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
};

export const saveRecipeToCloud = async (recipe, userId) => {
  try {
    const recipeRef = firestore.collection('recipes').doc();
    await recipeRef.set({
      ...recipe,
      userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return recipeRef.id;
  } catch (error) {
    throw error;
  }
};

export const getRecipesFromCloud = async (limit = 20) => {
  try {
    const snapshot = await firestore
      .collection('recipes')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

export default {
  auth,
  firestore,
  storage,
  signUp,
  signIn,
  signOut,
  uploadImage,
  saveRecipeToCloud,
  getRecipesFromCloud,
};