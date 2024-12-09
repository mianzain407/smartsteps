import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding3() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('../screens/SignUp');
  };

  const handleLogIn = () => {
    router.push('../screens/Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration */}
        <Image source={require('../../assets/images/illustration 03.png')} style={styles.image} />

        {/* Title */}
        <Text style={styles.title}>Create your own study plan</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Study according to the study plan, make study more motivated
        </Text>

        {/* Pagination */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
            <Text style={styles.logInButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between', // Distribute elements evenly with controlled spacing
    alignItems: 'center',
    paddingVertical: height * 0.05, // Add vertical padding for content centering
  },
  image: {
    width: width * 0.6, // Dynamic width for responsiveness
    height: width * 0.6, // Maintain aspect ratio
    resizeMode: 'contain',
  },
  title: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginVertical: height * 0.01, // Reduce vertical gap
  },
  subtitle: {
    fontSize: Math.min(width * 0.045, 16),
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
    marginVertical: height * 0.01, // Minimize extra spacing
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.02, // Smaller spacing around dots
  },
  dot: {
    height: width * 0.02,
    borderRadius: width * 0.01,
    marginHorizontal: width * 0.01,
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
    width: width * 0.02,
  },
  activeDot: {
    backgroundColor: '#4F63AC',
    width: width * 0.05,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: height * 0.02, // Adjust spacing to reduce gaps near buttons
  },
  signUpButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: height * 0.015, // Proportional padding
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  logInButton: {
    borderColor: '#4A90E2',
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: Math.min(width * 0.045, 16),
    fontWeight: 'bold',
  },
  logInButtonText: {
    color: '#4A90E2',
    fontSize: Math.min(width * 0.045, 16),
    fontWeight: 'bold',
  },
});
