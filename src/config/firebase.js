import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  // ⬅️ Import Realtime Database
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDF3cG4ID3LGGtIcS_WbntGcJD5ULMyesM",
  authDomain: "codecraft-a2e21.firebaseapp.com",
  databaseURL: "https://codecraft-a2e21-default-rtdb.firebaseio.com",  // ⬅️ Realtime DB URL Add Karo
  projectId: "codecraft-a2e21",
  storageBucket: "codecraft-a2e21.appspot.com",
  messagingSenderId: "769492442775",
  appId: "1:769492442775:web:0882c9dd6a34f3f0d953d2",
  measurementId: "G-39B56GSRPB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app); // ⬅️ Ensure Realtime Database Initialized

// Debugging logs
console.log("🔥 Firebase Initialized:", app);
console.log("🗄️ Firestore:", db);
console.log("📡 Realtime Database:", rtdb);

// Set Auth Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Firebase Auth Persistence Set to Local"))
  .catch((error) => console.error("🚨 Firebase Auth Persistence Error:", error));

// Export Firebase services
export { auth, db, rtdb };
export default app;
