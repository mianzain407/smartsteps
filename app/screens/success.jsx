import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter hook from expo-router
import screen from '../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SuccessScreen() {
  const router = useRouter(); // Use the useRouter hook for navigation

  const handleDone = () => {
    // Navigate or handle any further actions using router
    router.push('../screens/Login'); // Example: Navigate back
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={60} color="#3F3DFF" />
        </View>
        <Text style={styles.title}>Success</Text>
        <Text style={styles.message}>
          Congratulations, you have completed your registration!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F7', // Adjust background color as needed
    marginTop : -50,
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7B7B8D',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3F3DFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
