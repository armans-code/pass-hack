import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAI9ZmcnRf1eHboluyoOlPM94S2Wfao8ao",
  authDomain: "massey-hackathon.firebaseapp.com",
  projectId: "massey-hackathon",
  storageBucket: "massey-hackathon.appspot.com",
  messagingSenderId: "841396285132",
  appId: "1:841396285132:web:08a866eee72fa2a2a61c69"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };