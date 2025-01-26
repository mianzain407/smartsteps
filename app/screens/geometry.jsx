import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); // Get the device width for responsive design

// List of shapes
const shapes = [
  { name: 'Circle' },
  { name: 'Cross' },
  { name: 'Diamond' },
  { name: 'Heart' },
  { name: 'Hexagon' },
  { name: 'Oval' },
  { name: 'Pentagon' },
  { name: 'Rectangle' },
  { name: 'Square' },
  { name: 'Star' },
  { name: 'Triangle' },
  { name: 'Trapezoid' },
];

// Example images mapping for each shape (Replace these with your actual images)
const images = {
  Circle: require('../../assets/images/geomatry/circle.png'),
  Cross: require('../../assets/images/geomatry/cross.png'),
  Diamond: require('../../assets/images/geomatry/diamond.png'),
  Heart: require('../../assets/images/geomatry/heart.png'),
  Hexagon: require('../../assets/images/geomatry/hexagon.png'),
  Oval: require('../../assets/images/geomatry/oval.png'),
  Pentagon: require('../../assets/images/geomatry/pentagon.png'),
  Rectangle: require('../../assets/images/geomatry/rectangle.png'),
  Square: require('../../assets/images/geomatry/square.png'),
  Star: require('../../assets/images/geomatry/star.png'),
  Triangle: require('../../assets/images/geomatry/triangle.png'),
  Trapezoid: require('../../assets/images/geomatry/trapezoid.png'),
};

const GeometryScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to speak the shape name with debounce
  const speakShape = async (shape) => {
    if (isSpeaking) return; // Prevent overlapping speech

    setIsSpeaking(true); // Lock speech
    Speech.speak(shape.toLowerCase(), {
      language: 'en-US',
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Geometrys.png')} // Background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.2 }} // Reduce image opacity directly
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {shapes.map((shape, index) => (
              <TouchableOpacity
                key={index}
                style={styles.shapeContainer}
                onPress={() => speakShape(shape.name)} // Speak shape name when pressed
              >
                {/* Display image if available */}
                {images[shape.name] ? (
                  <Image source={images[shape.name]} style={styles.image} />
                ) : (
                  <Text style={styles.shapeText}>{shape.name}</Text> // Fallback text if no image
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
  shapeContainer: {
    width: width / 3, // Responsive width for 3 items per row
    height: width / 2, // Square container
    margin: 20,
    marginTop:-20,
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
  shapeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GeometryScreen;
