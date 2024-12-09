import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// List of countries with their names and corresponding images
const countries = [
  { name: 'Australia', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Argentina', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Belgium', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Brazil', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Canada', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Cambodia', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'China', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Japan', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Pakistan', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'France', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Ireland', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Russia', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'UK', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'United States', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Palestine', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Vietnam', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'South Korea', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Thailand', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'India', image: require('../../assets/images/Alphabet.jpg') },
  { name: 'Luxemburg', image: require('../../assets/images/Alphabet.jpg') },

];

const CountryScreen = () => {
  const speakCountry = (countryName) => {
    Speech.speak(countryName); // Speaks the country's name
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Fruits.jpg')} // Background image (replace with your actual background image)
      style={styles.backgroundImage}
    >
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {countries.map((country, index) => (
            <TouchableOpacity
              key={index}
              style={styles.countryContainer}
              onPress={() => speakCountry(country.name)}
            >
              {/* Use a different image for each country */}
              <Image source={country.image} style={styles.countryImage} />
              {/* Country name */}
              <Text style={styles.countryText}>{country.name}</Text>
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
  countryContainer: {
    width: width / 3, // 3 items per row (responsive grid)
    height: width / 3, // Square-shaped container for each country
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent', // Transparent background for country containers
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'relative',
  },
  countryImage: {
    width: '100%',
    height: '70%', // Adjust the height to fit the image properly
    resizeMode: 'contain', // Ensures the image fits within the bounds without distortion
  },
  countryText: {
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

export default CountryScreen;
