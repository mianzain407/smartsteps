import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, PanResponder, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding1() {
  const router = useRouter();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < 20 && Math.abs(gestureState.dy) > 20) {
          handleSkip();
        }
      },
    })
  ).current;

  const handleSkip = () => {
    router.push('../screens/Onboarding2');
  };

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      {/* Skip Button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/illustration 01.png')}
          style={styles.image}
        />
      </View>

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>SmartSteps</Text>
        <Text style={styles.subtitleText}>
          Find your way to learning{'\n'}Enroll today!
        </Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Padding for smaller screens
  },
  skipButton: {
    position: 'absolute',
    top: height * 0.09, // Position relative to screen height
    right: 20,
  },
  skipText: {
    color: '#6A1B9A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    width: '100%',
  },
  image: {
    width: width * 0.6, // Responsive width
    height: width * 0.6, // Maintain aspect ratio
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    flex: 0.2,
  },
  titleText: {
    fontSize: Math.min(width * 0.08, 28), // Dynamic font size based on screen width
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: Math.min(width * 0.04, 16), // Adjust subtitle text size
    color: '#B0B0C3',
    textAlign: 'center',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  dot: {
    width: width * 0.025, // Responsive size for dots
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: '#B0B0C3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4F63AC',
    width: width * 0.06,
  },
});
