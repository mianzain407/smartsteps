import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); // Get the device width for responsive design

// List of alphabets
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Example images mapping for each alphabet (Replace these with your actual images)
const images = {
  A: require('../../assets/images/alphabet/A.png'),
  B: require('../../assets/images/alphabet/B.png'),
  C: require('../../assets/images/alphabet/C.png'),
  D: require('../../assets/images/alphabet/D.png'),
  E: require('../../assets/images/alphabet/E.png'),
  F: require('../../assets/images/alphabet/F.png'),
  G: require('../../assets/images/alphabet/G.png'),
  H: require('../../assets/images/alphabet/H.png'),
  I: require('../../assets/images/alphabet/I.png'),
  J: require('../../assets/images/alphabet/J.png'),
  K: require('../../assets/images/alphabet/K.png'),
  L: require('../../assets/images/alphabet/L.png'),
  M: require('../../assets/images/alphabet/M.png'),
  N: require('../../assets/images/alphabet/N.png'),
  O: require('../../assets/images/alphabet/O.png'),
  P: require('../../assets/images/alphabet/P.png'),
  Q: require('../../assets/images/alphabet/Q.png'),
  R: require('../../assets/images/alphabet/R.png'),
  S: require('../../assets/images/alphabet/S.png'),
  T: require('../../assets/images/alphabet/T.png'),
  U: require('../../assets/images/alphabet/U.png'),
  V: require('../../assets/images/alphabet/V.png'),
  W: require('../../assets/images/alphabet/W.png'),
  X: require('../../assets/images/alphabet/X.png'),
  Y: require('../../assets/images/alphabet/Y.png'),
  Z: require('../../assets/images/alphabet/Z.png'),
};

const AlphabetScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to speak the alphabet with debounce
  const speakAlphabet = async (alphabet) => {
    if (isSpeaking) return; // Prevent overlapping speech

    setIsSpeaking(true); // Lock speech
    Speech.speak(alphabet.toLowerCase(), {
      language: 'en-US',
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Alphabet.jpg')} // Background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }} // Reduce image opacity directly
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
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
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
