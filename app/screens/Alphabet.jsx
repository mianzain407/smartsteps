import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); // Get the device width for responsive design

// List of alphabets
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Example images mapping for each alphabet (Replace these with your actual images)
const images = {
  A: require('../../assets/images/Alphabet.jpg'),
  B: require('../../assets/images/Colours.jpg'),
  C: require('../../assets/images/Fruits.jpg'),
  D: require('../../assets/images/Number.jpg'),
  E: require('../../assets/images/Alphabet.jpg'),
  F: require('../../assets/images/Colours.jpg'),
  G: require('../../assets/images/Fruits.jpg'),
  H: require('../../assets/images/Number.jpg'),
  I: require('../../assets/images/Alphabet.jpg'),
  J: require('../../assets/images/Colours.jpg'),
  K: require('../../assets/images/Fruits.jpg'),
  L: require('../../assets/images/Number.jpg'),
  M: require('../../assets/images/Alphabet.jpg'),
  N: require('../../assets/images/Colours.jpg'),
  O: require('../../assets/images/Fruits.jpg'),
  P: require('../../assets/images/Number.jpg'),
  Q: require('../../assets/images/Alphabet.jpg'),
  R: require('../../assets/images/Colours.jpg'),
  S: require('../../assets/images/Fruits.jpg'),
  T: require('../../assets/images/Number.jpg'),
  U: require('../../assets/images/Alphabet.jpg'),
  V: require('../../assets/images/Colours.jpg'),
  W: require('../../assets/images/Fruits.jpg'),
  X: require('../../assets/images/Number.jpg'),
  Y: require('../../assets/images/Alphabet.jpg'),
  Z: require('../../assets/images/Colours.jpg'),
};

const AlphabetScreen = () => {
  // Function to speak the alphabet (Ensure it speaks just the letter)
  const speakAlphabet = (alphabet) => {
    // Convert the alphabet to lowercase before speaking
    Speech.speak(alphabet.toLowerCase(), { language: 'en-US' }); // 'en-US' ensures the language is set to US English
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Alphabet.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {alphabets.map((alphabet, index) => (
            <TouchableOpacity
              key={index}
              style={styles.letterContainer}
              onPress={() => speakAlphabet(alphabet)} // Speak alphabet when pressed
            >
              {/* Display image if available */}
              {images[alphabet] ? (
                <Image source={images[alphabet]} style={styles.image} />
              ) : (
                <Text style={styles.letterText}>{alphabet}</Text> // Fallback text if no image
              )}
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
  letterContainer: {
    width: width / 3, // Responsive width for 3 items per row
    height: width / 3, // Square container
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // backgroundColor: '#f0f0f0', // Light grey background for the letter container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain', // Adjusts the image to fit within the container
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AlphabetScreen;
