import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp38GOeKyWpjdAXDoqFHX929VYCIQgwDI",
  authDomain: "tired-city-shop-2d704.firebaseapp.com",
  projectId: "tired-city-shop-2d704",
  storageBucket: "tired-city-shop-2d704.appspot.com",
  messagingSenderId: "495993861829",
  appId: "1:495993861829:web:b52c9e97e137fae7b022ac",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
