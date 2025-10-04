import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, getDocs, query, orderBy, limit as queryLimit } from 'firebase/firestore';

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw error;
  }
};

export const saveRecipeToCloud = async (recipe, userId) => {
  try {
    const recipeRef = doc(collection(firestore, 'recipes'));
    await setDoc(recipeRef, {
      ...recipe,
      userId,
      createdAt: new Date(),
    });
    return recipeRef.id;
  } catch (error) {
    throw error;
  }
};

export const getRecipesFromCloud = async (limit = 20) => {
  try {
    const q = query(
      collection(firestore, 'recipes'),
      orderBy('createdAt', 'desc'),
      queryLimit(limit)
    );
    const snapshot = await getDocs(q);
    
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