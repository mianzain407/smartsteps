import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Validate inputs
  const validateInputs = () => {
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName) {
      return 'Please enter your full name.';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (!isAgreed) {
      return 'Please agree to the terms and conditions.';
    }
    return null;
  };

  // Handle sign-up logic
  const handleSignUp = async () => {
    const error = validateInputs();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    setIsLoading(true);

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('User registered:', userCredential.user);

      // Save user data (excluding password for security reasons) to AsyncStorage
      const { firstName, lastName, email } = formData;
      const userData = { firstName, lastName, email };

      await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Store user data in AsyncStorage

      // Navigate to the Login screen after successful account creation
      router.replace('/screens/Login'); // Adjust the path

    } catch (error) {
      console.error('Sign Up Error:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to Login screen
  const handleLogin = () => {
    router.push('/screens/Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your details below & free sign up</Text>

        <View style={styles.nameContainer}>
          <View style={styles.nameInputWrapper}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
            />
          </View>
          <View style={styles.nameInputWrapper}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
            />
          </View>
        </View>

        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <MaterialIcons
            name={isAgreed ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={isAgreed ? '#3F3DFF' : 'gray'}
          />
          <Text style={styles.termsText}>
            By creating an account, you agree to our terms & conditions.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.signUpButtonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: Math.min(width * 0.1, 38),
    fontWeight: 'bold',
    color: '#2B2D42',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: Math.min(width * 0.045, 16),
    color: '#8D99AE',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  nameInputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  nameInput: {
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: Math.min(width * 0.04, 16),
    height: height * 0.07,
  },
  label: {
    fontSize: Math.min(width * 0.04, 14),
    color: '#8D99AE',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: height * 0.02,
    fontSize: Math.min(width * 0.04, 16),
    height: height * 0.07,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: height * 0.02,
    height: height * 0.07,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: Math.min(width * 0.04, 16),
  },
  eyeIcon: {
    padding: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  termsText: {
    marginLeft: 10,
    fontSize: Math.min(width * 0.035, 12),
    color: '#8D99AE',
    flex: 1,
  },
  signUpButton: {
    backgroundColor: '#3F3DFF',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    width: '100%',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: Math.min(width * 0.05, 18),
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: Math.min(width * 0.035, 12),
    color: '#8D99AE',
  },
  loginText: {
    color: '#3F3DFF',
    fontSize: Math.min(width * 0.035, 12),
    fontWeight: 'bold',
  },
});
