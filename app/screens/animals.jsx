import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); // Get the device width for responsive design

// List of animals
const animals = [
  'Fish',
  'Butterfly',
  'Crab',
  'Cricket',
  'Cow',
  'Elephant',
  'Camel',
  'Giraffe',
  'Chicken',
  'Sparrow',
  'Hippopotamus',
  'Horse',
  'Monkey',
  'Bee',
  'Snake',
  'Sheep',
  'Cat',
  'Lion',
];

// Example images mapping for each animal (Replace these with your actual images)
const images = {
  Fish: require('../../assets/images/animals/fish.png'),
  Butterfly: require('../../assets/images/animals/butterfly.png'),
  Crab: require('../../assets/images/animals/crab.png'),
  Cricket: require('../../assets/images/animals/cricket.png'),
  Cow: require('../../assets/images/animals/cow.png'),
  Elephant: require('../../assets/images/animals/elephant.png'),
  Camel: require('../../assets/images/animals/camel.png'),
  Giraffe: require('../../assets/images/animals/giraffe.png'),
  Chicken: require('../../assets/images/animals/chicken.png'),
  Sparrow: require('../../assets/images/animals/sparrow.png'),
  Hippopotamus: require('../../assets/images/animals/hippoptamus.png'),
  Horse: require('../../assets/images/animals/horse.png'),
  Monkey: require('../../assets/images/animals/monkey.png'),
  Bee: require('../../assets/images/animals/bee.png'),
  Snake: require('../../assets/images/animals/snake.png'),
  Sheep: require('../../assets/images/animals/sheep.png'),
  Cat: require('../../assets/images/animals/cat.png'),
  Lion: require('../../assets/images/animals/Lion.png'),
};

const AnimalsScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to speak the animal name with debounce
  const speakAnimal = async (animal) => {
    if (isSpeaking) return; // Prevent overlapping speech

    setIsSpeaking(true); // Lock speech
    Speech.speak(animal.toLowerCase(), {
      language: 'en-US',
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Animal.png')} // Background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.3 }} // Reduce image opacity directly
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {animals.map((animal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.animalContainer}
                onPress={() => speakAnimal(animal)} // Speak animal name when pressed
              >
                {/* Display image if available */}
                {images[animal] ? (
                  <Image source={images[animal]} style={styles.image} />
                ) : (
                  <Text style={styles.animalText}>{animal}</Text>
                  
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
  animalContainer: {
    width: width / 3, // Responsive width for 3 items per row
    height: width / 3, // Square container
    margin: 10,
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
  animalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AnimalsScreen;
