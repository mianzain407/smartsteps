import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SettingsScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load profile image
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (storedProfileImage) {
          console.log('Loaded profile image:', storedProfileImage);  // Debug log
          setProfileImage(storedProfileImage);
        }

        // Load user data
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Handle image picking from gallery
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use MediaTypeOptions.Images
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;  // Extract the URI from the response

        if (imageUri) {
          setProfileImage(imageUri);
          await AsyncStorage.setItem('profileImage', imageUri);
        } else {
          Alert.alert('Error: Image URI not available');
        }
      } else {
        Alert.alert('No image selected');
      }
    } catch (error) {
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('profileImage');
      await AsyncStorage.removeItem('quizScores');
      await AsyncStorage.removeItem('timeSpent');
      router.replace('../screens/Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Profile Settings Title */}
        <Text style={styles.title}>Profile Settings</Text>

        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/illustration 01.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Display User Details */}
        <View style={styles.userDetailsContainer}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{userData.firstName || 'Not available'}</Text>

          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{userData.lastName || 'Not available'}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email || 'Not available'}</Text>

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>{userData.password ? '********' : 'Not available'}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    fontSize: Math.min(width * 0.08, 32),
    fontWeight: 'bold',
    color: '#2B2D42',
    textAlign: 'left',
    marginBottom: height * 0.05,
    marginTop: -90,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: height * 0.0,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#2B2D42',
  },
  userDetailsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#4285F4',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: 'bold',
  },
});
