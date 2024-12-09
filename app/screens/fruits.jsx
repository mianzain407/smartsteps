import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// List of fruits with their names
const fruits = [
  { name: 'Apple'},
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
  Apple: require('../../assets/images/Alphabet.jpg'),
//   Banana: require('../../assets/images/banana.png'),
//   Cherry: require('../../assets/images/cherry.png'),
//   Coconut: require('../../assets/images/coconut.png'),
//   Grapes: require('../../assets/images/grapes.png'),
//   Guava: require('../../assets/images/guava.png'),
//   Kiwi: require('../../assets/images/kiwi.png'),
//   Lemon: require('../../assets/images/lemon.png'),
//   Litchi: require('../../assets/images/litchi.png'),
//   Orange: require('../../assets/images/orange.png'),
//   Peach: require('../../assets/images/peach.png'),
//   Pear: require('../../assets/images/pear.png'),
//   Pineapple: require('../../assets/images/pineapple.png'),
//   Pomegranate: require('../../assets/images/pomegranate.png'),
//   Strawberry: require('../../assets/images/strawberry.png'),
//   Tomato: require('../../assets/images/tomato.png'),
//   Watermelon: require('../../assets/images/watermelon.png'),
//   Mango: require('../../assets/images/mango.png'),
};

const FruitsScreen = () => {
  const speakFruit = (fruitName) => {
    Speech.speak(fruitName);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Fruits.jpg')} // Replace with the correct background image
      style={styles.backgroundImage}
    >
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {fruits.map((fruit, index) => (
            <TouchableOpacity
              key={index}
              style={styles.fruitContainer}
              onPress={() => speakFruit(fruit.name)}
            >
              {/* Display the image if available */}
              <Image source={images[fruit.name]} style={styles.fruitImage} />
              {/* Fruit name */}
              <Text style={styles.fruitText}>{fruit.name}</Text>
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
    height: width / 3, // Square-shaped container for each fruit
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Transparent background for fruit containers
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
