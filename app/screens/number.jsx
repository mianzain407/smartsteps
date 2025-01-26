import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech'; // Importing expo-speech
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); 

// List of numbers from 1 to 20
const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

// Example images mapping for numbers (You can replace these paths with your actual images)
const images = {
  1: require('../../assets/images/counting/1.png'),
  2: require('../../assets/images/counting/2.png'),
  3: require('../../assets/images/counting/3.png'),
  4: require('../../assets/images/counting/4.png'),
  5: require('../../assets/images/counting/5.png'),
  6: require('../../assets/images/counting/6.png'),
  7: require('../../assets/images/counting/7.png'),
  8: require('../../assets/images/counting/8.png'),
  9: require('../../assets/images/counting/9.png'),
  10: require('../../assets/images/counting/10.png'),
  11: require('../../assets/images/counting/11.png'),
  12: require('../../assets/images/counting/12.png'),
  13: require('../../assets/images/counting/13.png'),
  14: require('../../assets/images/counting/14.png'),
  15: require('../../assets/images/counting/15.png'),
  16: require('../../assets/images/counting/16.png'),
  17: require('../../assets/images/counting/17.png'),
  18: require('../../assets/images/counting/18.png'),
  19: require('../../assets/images/counting/19.png'),
  20: require('../../assets/images/counting/20.png'),
};

const CountingScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Debounce function to limit calls to speakNumber
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Function to speak the number
  const speakNumber = useCallback(async (number) => {
    if (isSpeaking) return; // Prevent overlapping speech

    setIsSpeaking(true); // Lock speech
    Speech.speak(number.toString(), {
      language: 'en-US',
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  }, [isSpeaking]);

  const debouncedSpeakNumber = debounce(speakNumber, 100); // Reduced debounce time to 200ms

  return (
    <ImageBackground
      source={require('../../assets/images/Number.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}> 
            {numbers.map((number, index) => (
              <TouchableOpacity
                key={index}
                style={styles.numberContainer}
                onPress={() => debouncedSpeakNumber(number)} // Speak number when pressed
              >
                {/* Display image if available */}
                {images[number] ? (
                  <Image source={images[number]} style={styles.image} />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjusts how the image is resized to fill the screen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // Adds space at the top and bottom
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberContainer: {
    width: width / 3, // Responsive width for 3 items per row
    height: width / 3, // Square container
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Ensures child content does not overflow the container
    backgroundColor: 'transparent', // Making the container transparent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensures the image fits within the bounds without overflowing
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute', // Positions the text over the image
    zIndex: 1, // Makes sure the text is on top of the image
  },
});

export default CountingScreen;
