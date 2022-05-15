import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// add firebase config
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messageSenderId",
  appId: "appId"
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();

export { auth };