import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech'; // Importing expo-speech
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); 

// List of numbers from 1 to 20
const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

// Example images mapping for numbers (You can replace these paths with your actual images)
const images = {
  1: require('../../assets/images/Alphabet.jpg'),
  2: require('../../assets/images/Colours.jpg'),
  3: require('../../assets/images/Fruits.jpg'),
  4: require('../../assets/images/Number.jpg'),
  5: require('../../assets/images/Alphabet.jpg'),
  6: require('../../assets/images/Colours.jpg'),
  7: require('../../assets/images/Fruits.jpg'),
  8: require('../../assets/images/Number.jpg'),
  9: require('../../assets/images/Alphabet.jpg'),
 10: require('../../assets/images/Colours.jpg'),
 11: require('../../assets/images/Fruits.jpg'),
 12: require('../../assets/images/Number.jpg'),
 13: require('../../assets/images/Alphabet.jpg'),
 14: require('../../assets/images/Colours.jpg'),
 15: require('../../assets/images/Fruits.jpg'),
 16: require('../../assets/images/Number.jpg'),
 17: require('../../assets/images/Alphabet.jpg'),
 18: require('../../assets/images/Colours.jpg'),
 19: require('../../assets/images/Fruits.jpg'),
 20: require('../../assets/images/Number.jpg'),
};

const CountingScreen = () => {
  // Function to speak the number
  const speakNumber = (number) => {
    Speech.speak(number.toString()); 
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Number.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}> 
          {numbers.map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numberContainer}
              onPress={() => speakNumber(number)} // Speak number when pressed
            >
              {/* Display image if available */}
              {images[number] ? (
                <Image source={images[number]} style={styles.image} />
              ) : null}
              {/* Number text */}
              <Text style={styles.numberText}></Text>
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
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Ensures child content does not overflow the container
    backgroundColor:'transperant', // Making the container transparent  '#f0f0f0' for color
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
