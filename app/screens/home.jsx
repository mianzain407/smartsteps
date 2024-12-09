import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, AppState } from 'react-native';
import { useRouter } from 'expo-router'; // Adjust based on your navigation library
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  // State to store time spent and app state
  const [timeSpent, setTimeSpent] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  // Learning Plan Options
  const learningPlan = [
    { title: 'Learning', path: '../screens/course' },
    { title: 'Video Learning', path: '../screens/videoLearning' },
    { title: 'Games', path: '../screens/course' },
    { title: 'Quiz', path: '../screens/Quiz' },
    { title: 'Report', path: '../screens/course' },
  ];

  useEffect(() => {
    // Load the saved time when the app starts
    const loadTime = async () => {
      const savedTime = await AsyncStorage.getItem('timeSpent');
      if (savedTime) {
        setTimeSpent(parseInt(savedTime, 10));
      }
    };

    loadTime();

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
          // Save the new time to AsyncStorage every second
          AsyncStorage.setItem('timeSpent', newTime.toString());
          return newTime;
        });
      }, 60000); // Update every minute (60000ms)
    }

    return () => {
      clearInterval(timer); // Clean up the timer if the component unmounts or app goes background
    };
  }, [appState, timeSpent]);

  // Handle Reset when app is reopened
  useEffect(() => {
    if (appState === 'inactive' || appState === 'background') {
      // Optionally save the time or stop tracking when the app goes into the background
      AsyncStorage.setItem('timeSpent', timeSpent.toString());
    }

    if (appState === 'active' && timeSpent >= 60) {
      // If 60 minutes are completed, stop the timer
      clearInterval();
    }
  }, [appState, timeSpent]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Static Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi, Zain</Text>
          <Text style={styles.subText}>Let’s start learning</Text>
        </View>
        <Image
          source={require('../../assets/images/illustration 01.png')}
          style={styles.profileImage}
        />
      </View>

      {/* Dynamic Learned Today Section */}
      <View style={styles.learnedTodaySection}>
        <View style={styles.learnedTodayLeft}>
          <Text style={styles.learnedTodayTitle}>Learned today</Text>
          <Text style={styles.learnedTodayValue}>
            {timeSpent}min <Text style={styles.learnedTodayTotal}>/ 60min</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('../screens/course')}>
          <Text style={styles.myCoursesText}>My courses</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    marginTop: -55,
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
