import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, AppState, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  // State to store time spent, app state, and user's first name
  const [timeSpent, setTimeSpent] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [firstName, setFirstName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Learning Plan Options
  const learningPlan = [
    { title: 'Learning', path: '../screens/course' },
    { title: 'Video Learning', path: '../screens/videoLearning' },
    { title: 'Games', path: '../screens/test' },
    { title: 'Quiz', path: '../screens/Quiz' },
    { title: 'Report', path: '../screens/report' },
  ];

  useEffect(() => {
    // Load the saved time, user data, and profile image when the app starts
    const loadUserData = async () => {
      try {
        const savedTime = await AsyncStorage.getItem('timeSpent');
        if (savedTime) {
          setTimeSpent(parseInt(savedTime, 10));
        }

        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setFirstName(parsedUserData.firstName); // Set the first name
        }

        // Load profile image
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (storedProfileImage) {
          setProfileImage(storedProfileImage); // Set profile image if available
        }

      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();

    // Listen for app state changes (foreground, background)
    const appStateListener = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (appState === 'active' && timeSpent < 60) {
      // Only update time if the app is in the foreground
      timer = setInterval(() => {
        setTimeSpent(prevTime => {
          const newTime = prevTime + 1;
          // Save the new time to AsyncStorage every minute
          AsyncStorage.setItem('timeSpent', newTime.toString());

          // Check if timeSpent exceeds 60 minutes, then show alert
          if (newTime >= 60) {
            Alert.alert(
              'Warning',
              'You have spent a lot of time on the app. It’s important to take breaks for your health!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // Reset the time to 0 after alert is acknowledged
                    setTimeSpent(0);
                    AsyncStorage.setItem('timeSpent', '0');
                  },
                },
              ],
              { cancelable: false }
            );
            clearInterval(timer); // Stop the timer after 60 minutes
          }

          return newTime;
        });
      }, 60000); // Update every minute (60000ms)
    }

    return () => {
      clearInterval(timer);
    };
  }, [appState, timeSpent]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi, {firstName}</Text>
          <Text style={styles.subText}>Let’s start learning</Text>
        </View>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/illustration 01.png')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.learnedTodaySection}>
        <View style={styles.learnedTodayLeft}>
          <Text style={styles.learnedTodayTitle}>Learned today</Text>
          <Text style={styles.learnedTodayValue}>
            {timeSpent}min <Text style={styles.learnedTodayTotal}>/ 60min</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('../screens/setting')}>
          <Text style={styles.myCoursesText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Static Get Started Button with Image Section */}
      <View style={styles.horizontalScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/courseGetStarted.png')} style={styles.mainImage} />
            <TouchableOpacity onPress={() => router.push('../screens/course')} style={styles.getStartedButton}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/illustration 02.png')} style={styles.mainImage} />
          </View>
        </ScrollView>
      </View>

      {/* Scrollable Content Section */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.learningPlanContainer}>
          <Text style={styles.sectionTitle}>What your plan today?</Text>
          {learningPlan.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={styles.learningPlanItem}
              onPress={() => router.push(plan.path)} // Navigate using router.push
            >
              <Text style={styles.learningPlanTitle}>{plan.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Replacement Image Section */}
        <View style={styles.replacementImageContainer}>
          <Image
            source={require('../../assets/images/Meetup.png')}
            style={styles.replacementImage}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#4285F4',
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
    marginTop: 50,
    marginHorizontal: 15,
    height: 100,
    borderRadius: 28,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  learnedTodaySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  learnedTodayLeft: {
    flexDirection: 'column',
  },
  learnedTodayTitle: {
    fontSize: 16,
    color: '#333',
  },
  learnedTodayValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
    marginTop: 4,
  },
  learnedTodayTotal: {
    fontSize: 16,
    color: '#999',
  },
  myCoursesText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalScrollContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 154, // Fixed height to ensure it does not shrink
  },
  imageContainer: {
    position: 'relative',
    width: 253,
    height: '100%', // Ensures it fills the height of its container
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  getStartedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1, // Ensures the scroll container fills remaining space
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  learningPlanContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  learningPlanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  learningPlanTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  replacementImageContainer: {
    marginHorizontal: 20,
    marginTop: 5,
    alignItems: 'flex-start', // Align content to the start of the container
    justifyContent: 'center',
    width: '100%', // Matches the container's width with learning plan items
  },
  replacementImage: {
    width: width - 40, // Full width minus margins
    height: 150,
    borderRadius: 10,
  },
});
