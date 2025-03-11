import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Function to sign up with Email and Password (with email verification)
export const signUpUser = async (email, password, displayName) => {
  try {
    // Check if user already exists in Firestore
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: false, message: "User already exists. Please log in." };
    }

    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, { displayName });

    // Send email verification
    await sendEmailVerification(user);

    // Create user document in Firestore (marked as unverified)
    await setDoc(userRef, {
      email: user.email,
      displayName,
      photoURL: user.photoURL || "/robotic.png",
      authProvider: "email",
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

    return { success: true, message: "Verification email sent. Please check your inbox." };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { success: false, message: error.message };
  }
};
