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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName) {
      Alert.alert('Input Error', 'Please enter your full name');
      return;
    }
    if (!email) {
      Alert.alert('Input Error', 'Please enter your email');
      return;
    }

    if (!password) {
      Alert.alert('Input Error', 'Please enter your password');
      return;
    }

    if (!isAgreed) {
      Alert.alert('', 'Please agree to the terms and conditions');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      // Navigate to the success screen after sign-up
      router.push('../screens/success');
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
    }
  };

  const handleLogin = () => {
    router.push('../screens/Login');
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
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.nameInputWrapper}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

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

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Create account</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  footerText: {
    fontSize: Math.min(width * 0.04, 14),
    color: '#8D99AE',
  },
  loginText: {
    color: '#3F3DFF',
    fontWeight: 'bold',
    fontSize: Math.min(width * 0.04, 14),
  },
});
