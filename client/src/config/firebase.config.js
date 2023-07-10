import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMyyhfRjVX6Fed6G6lGfRJq-ixg6BzUqI", authDomain: "tele-med-4e48d.firebaseapp.com", projectId: "tele-med-4e48d", storageBucket: "tele-med-4e48d.appspot.com", messagingSenderId: "851884128934",
  appId: "1:851884128934:web:ea97d4629cb85f1a53d267"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, app };