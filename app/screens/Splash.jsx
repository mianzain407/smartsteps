import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig'; // Adjust the path if needed

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to Home screen
        router.replace('/screens/home');  // Correct path
      } else {
        // No user is signed in, navigate to Sign Up screen
        router.replace('/screens/SignUp');  // Correct path
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3F3DFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
