import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase"; // Firestore instance

// Helper function to create/update user in Firestore
const createUserInFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || "/robotic.png",
      authProvider: "google",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      twoFactorEnabled: false,
      workspaces: {},
      settings: {
        theme: "dark",
        fontSize: 14,
        showLineNumbers: true,
        aiSuggestions: true,
      },
      snippets: [],
    });
    console.log("New user created in Firestore:", user.displayName);
  } else {
    console.log("User already exists, logging in:", user.displayName);
  }
};

// Function to log in with Email and Password (with email verification check)
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Logged in with email:", user.email);

    // **CHECK EMAIL VERIFICATION STATUS**
    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    // Update last login timestamp in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });

    return user;
  } catch (error) {
    console.error("Error logging in with email:", error.message);
    let errorMessage = "An error occurred. Please try again.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "No account found with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        break;
      default:
        errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// Function to log in with Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Logged in with Google:", user.displayName);

    await createUserInFirestore(user);

    return { success: true, user };
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    return { success: false, error: error.message };
  }
};
