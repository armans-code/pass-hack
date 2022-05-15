import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'test',
	authDomain: 'test',
	projectId: 'test',
	storageBucket: 'test',
	messagingSenderId: 'test',
	appId: 'test',
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
