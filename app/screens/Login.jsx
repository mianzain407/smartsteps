import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig'; // Ensure this path matches your setup

const { width, height } = Dimensions.get('window');

export default function LogInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Input Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Navigate to home screen after successful login
      router.push('../screens/home'); // Adjust this path as necessary
    } catch (error) {
      console.error('Login Error:', error.message);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  const handleSignUp = () => {
    router.push('../screens/SignUp'); // Adjust this path as necessary
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your details below to log in</Text>

        {/* Email Input */}
        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with visibility toggle */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
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
  content: {
    width: '100%',
    maxWidth: width * 0.9,
    alignItems: 'center',
  },
  title: {
    fontSize: Math.min(width * 0.1, 38),
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: Math.min(width * 0.045, 16),
    color: '#8D99AE',
    textAlign:'center',
    marginBottom: height * 0.05,
  },
  label: {
    fontSize: Math.min(width * 0.04, 14),
    color: '#8D99AE',
    marginBottom: 5,
    alignSelf: 'flex-start',
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
    width: '100%',
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
  loginButton: {
    backgroundColor: '#3F3DFF',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: Math.min(width * 0.05, 18),
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
  },
  footerText: {
    fontSize: Math.min(width * 0.04, 14),
    color: '#8D99AE',
  },
  signUpText: {
    color: '#3F3DFF',
    fontWeight: 'bold',
    fontSize: Math.min(width * 0.04, 14),
  },
});
