// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADx12MS4sQLWMVxJ04fcjN7v5k4F3DOc4",
  authDomain: "chatapp-a1d5f.firebaseapp.com",
  projectId: "chatapp-a1d5f",
  storageBucket: "chatapp-a1d5f.appspot.com",
  messagingSenderId: "204789160993",
  appId: "1:204789160993:web:79e944538cd6322bbf5760",
  measurementId: "G-NKXP4JNHPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

// Export Firebase services
export { auth, firestore, analytics };
