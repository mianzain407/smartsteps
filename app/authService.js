import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Error message mapping for user-friendly feedback
const errorMessages = {
  "auth/email-already-in-use": "This email is already registered. Try logging in.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/weak-password": "Password should be at least 6 characters long.",
};

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user data
  } catch (error) {
    const customMessage = errorMessages[error.code] || "Sign-up failed. Please try again.";
    console.error("Sign Up Error:", customMessage);
    throw new Error(customMessage);
  }
};

// Login Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user data
  } catch (error) {
    const customMessage = errorMessages[error.code] || "Login failed. Please try again.";
    console.error("Login Error:", customMessage);
    throw new Error(customMessage);
  }
};

// Logout Function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw new Error("Failed to log out. Please try again.");
  }
};

// Password Reset Function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent.");
  } catch (error) {
    const customMessage = errorMessages[error.code] || "Failed to send password reset email.";
    console.error("Password Reset Error:", customMessage);
    throw new Error(customMessage);
  }
};

// Update User Profile Function
export const updateUserProfile = async (displayName, photoURL) => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      console.log("User profile updated.");
    } else {
      throw new Error("No user is currently signed in.");
    }
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    throw new Error("Failed to update profile. Please try again.");
  }
};

// Get Current User
export const getCurrentUser = () => {
  return auth.currentUser; // Returns the currently signed-in user
};

// Check Auth State
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback); // Monitors auth state changes
};
