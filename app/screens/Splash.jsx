import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAppState = async () => {
      try {
        // Check if user token exists in AsyncStorage
        const userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          // Token is available, navigate to the Home screen
          router.replace('/screens/home'); // Adjust the path if needed
          return;
        }

        // If no token, check onboarding status
        const isOnboarded = await AsyncStorage.getItem('isOnboarded');
        
        if (isOnboarded !== 'true') {
          // If not onboarded, navigate to the first onboarding screen
          router.replace('/screens/Onboarding1'); // Adjust the path if needed
        } else {
          // If user is not onboarded but has no token, navigate to Login screen
          router.replace('/screens/LogIn'); // Adjust the path if needed
        }

      } catch (error) {
        console.error('Error checking user token or onboarding status:', error);
      }
    };

    checkAppState();
  }, [router]);

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
