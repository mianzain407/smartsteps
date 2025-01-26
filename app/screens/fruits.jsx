import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// List of fruits with their names
const fruits = [
  { name: 'Apple' },
  { name: 'Banana' },
  { name: 'Cherry' },
  { name: 'Coconut' },
  { name: 'Grapes' },
  { name: 'Guava' },
  { name: 'Kiwi' },
  { name: 'Lemon' },
  { name: 'Litchi' },
  { name: 'Orange' },
  { name: 'Peach' },
  { name: 'Pear' },
  { name: 'Pineapple' },
  { name: 'Pomegranate' },
  { name: 'Strawberry' },
  { name: 'Tomato' },
  { name: 'Watermelon' },
  { name: 'Mango' },
];

// Example images mapping for fruits (Replace with your actual image paths)
const images = {
  Apple: require('../../assets/images/fruits/apple.png'),
  Banana: require('../../assets/images/fruits/banana.png'),
  Cherry: require('../../assets/images/fruits/cherry.png'),
  Coconut: require('../../assets/images/fruits/coconut.png'),
  Grapes: require('../../assets/images/fruits/grapes.png'),
  Guava: require('../../assets/images/fruits/guava.png'),
  Kiwi: require('../../assets/images/fruits/kiwi.png'),
  Lemon: require('../../assets/images/fruits/lemon.png'),
  Litchi: require('../../assets/images/fruits/litchi.png'),
  Orange: require('../../assets/images/fruits/orange.png'),
  Peach: require('../../assets/images/fruits/peach.png'),
  Pear: require('../../assets/images/fruits/pear.png'),
  Pineapple: require('../../assets/images/fruits/pineapple.png'),
  Pomegranate: require('../../assets/images/fruits/pomegranate.png'),
  Strawberry: require('../../assets/images/fruits/stawberry.png'),
  Tomato: require('../../assets/images/fruits/tomato.png'),
  Watermelon: require('../../assets/images/fruits/watermelon.png'),
  Mango: require('../../assets/images/fruits/mango.png'),
};

const FruitsScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Debounce function to limit rapid calls to the `speakFruit` function
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Function to speak the fruit name
  const speakFruit = useCallback((fruitName) => {
    if (isSpeaking) return; // Prevent overlapping speech
    setIsSpeaking(true); // Lock speech
    Speech.speak(fruitName, {
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  }, [isSpeaking]);

  // Apply the debounce function with a 200ms delay
  const debouncedSpeakFruit = debounce(speakFruit, 100);

  return (
    <ImageBackground
      source={require('../../assets/images/Fruits.jpg')} // Replace with the correct background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.6 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {fruits.map((fruit, index) => (
              <TouchableOpacity
                key={index}
                style={styles.fruitContainer}
                onPress={() => debouncedSpeakFruit(fruit.name)} // Speak fruit name with debouncer
              >
                {/* Display the image if available */}
                <Image source={images[fruit.name]} style={styles.fruitImage} />
                {/* Fruit name */}
                <Text style={styles.fruitText}>{fruit.name}</Text>
                <Text style={styles.fruitText}>{fruits.name}</Text>
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
    resizeMode: 'cover', // Ensures background image covers the screen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fruitContainer: {
    width: width / 3, // 3 items per row (responsive grid)
    height: width / 2, // Square-shaped container for each fruit
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'relative',
  },
  fruitImage: {
    width: '100%',
    height: '70%', // Adjust the height to fit the image properly
    resizeMode: 'contain', // Ensures the image fits within the bounds without distortion
  },
  fruitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 10, // Position the text at the bottom of the container
    textAlign: 'center',
    width: '100%',
    zIndex: 1, // Make sure the text is on top of the image
  },
});

export default FruitsScreen;
