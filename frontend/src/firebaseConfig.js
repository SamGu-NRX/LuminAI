// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  linkWithPopup,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// change to env.local?

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const linkWithGoogle = async () => {
  const user = auth.currentUser;
  await linkWithPopup(user, googleProvider);
};

const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    enrolled: false,
    course: "AI Innovate Scholars",
  });
};

const signInWithEmailAndPassword = async (email, password) => {
  await firebaseSignInWithEmailAndPassword(auth, email, password);
};

const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

const changePassword = async (password) => {
  const user = auth.currentUser;
  await updatePassword(user, password);
};
const signInWithDiscord = () => {
  window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_DISCORD_REDIRECT_URI}&response_type=code&scope=identify email`;
};

const linkWithDiscord = () => {
  window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_DISCORD_REDIRECT_URI}&response_type=code&scope=identify email`;
};

// const handleDiscordCallback = async (code) => {
//     const { data } = await axios.post('https://discord.com/api/oauth2/token', null, {
//       params: {
//         client_id: DISCORD_CLIENT_ID,
//         client_secret: 'YOUR_DISCORD_CLIENT_SECRET',
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: DISCORD_REDIRECT_URI,
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     const user = await axios.get('https://discord.com/api/users/@me', {
//       headers: {
//         Authorization: `Bearer ${data.access_token}`,
//       },
//     });

//     // Handle user data and authentication in your app
// };

export {
  auth,
  db,
  signInWithGoogle,
  signInWithDiscord,
  signInWithEmailAndPassword,
  registerWithEmail,
  sendPasswordResetEmail,
  updatePassword,
  linkWithGoogle,
  linkWithDiscord,
};
