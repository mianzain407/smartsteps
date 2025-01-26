import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import * as Speech from 'expo-speech'; // Importing expo-speech
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); // Get the device width for responsive design

// List of colors with their names and respective color codes
const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Green', code: '#008000' },
  { name: 'Grey', code: '#808080' },
  { name: 'Navy', code: '#000080' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Purple', code: '#800080' },
  { name: 'Red', code: '#FF0000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Yellow', code: '#FFFF00' },
];

const ColorsScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Debounce function to limit the number of times the color name is spoken
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Function to speak the color name
  const speakColor = useCallback((colorName) => {
    if (isSpeaking) return; // Prevent overlapping speech
    setIsSpeaking(true); // Lock speech
    Speech.speak(colorName, {
      onDone: () => setIsSpeaking(false), // Unlock speech when done
      onError: () => setIsSpeaking(false), // Handle errors and unlock
    });
  }, [isSpeaking]);

  // Apply the debounce to the speakColor function with 100ms delay
  const debouncedSpeakColor = debounce(speakColor, 100);

  return (
    <ImageBackground
      source={require('../../assets/images/Colours.jpg')} // Background image
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorContainer, { backgroundColor: color.code }]}
                onPress={() => debouncedSpeakColor(color.name)} // Speak the color name when pressed
              >
                <Text
                  style={[styles.colorText, { color: color.name === 'White'? '#000' : '#FFF' }]} // Adjust text color for white background
                >
                  {color.name}
                </Text>
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
    paddingTop: 10, // Adding more space from the top
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  colorContainer: {
    width: width / 3, // Responsive width for 3 items per row
    height: width / 3, // Square container
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E0E7FF', // Light background for text visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  colorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure text is centered within the color block
  },
});

export default ColorsScreen;
