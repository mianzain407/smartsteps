import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Debounce utility function
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// List of countries with their names and corresponding images
const countries = [
  { name: 'Qatar', image: require('../../assets/images/countries/Qatar.png') },
  { name: 'Saudia Arabia', image: require('../../assets/images/countries/Saudi Arabia.png') },
  { name: 'Germany', image: require('../../assets/images/countries/Germany.png') },
  { name: 'Brazil', image: require('../../assets/images/countries/Brazil.png') },
  { name: 'Canada', image: require('../../assets/images/countries/canada.png') },
  { name: 'Chile', image: require('../../assets/images/countries/chile.png') },
  { name: 'China', image: require('../../assets/images/countries/China.png') },
  { name: 'Japan', image: require('../../assets/images/countries/Japan.png') },
  { name: 'Pakistan', image: require('../../assets/images/countries/Pakistan.png') },
  { name: 'France', image: require('../../assets/images/countries/France.png') },
  { name: 'Italy', image: require('../../assets/images/countries/Italy.png') },
  { name: 'Monaco', image: require('../../assets/images/countries/Monaco.png') },
  { name: 'UK', image: require('../../assets/images/countries/United Kingdom.png') },
  { name: 'United States', image: require('../../assets/images/countries/United States.png') },
  { name: 'Palestine', image: require('../../assets/images/countries/Palestine.png') },
  { name: 'Mexico', image: require('../../assets/images/countries/Mexico.png') },
  { name: 'Sweden', image: require('../../assets/images/countries/Sweden.png') },
  { name: 'UAE', image: require('../../assets/images/countries/United Arab Emirates.png') },
  { name: 'India', image: require('../../assets/images/countries/India.png') },
  { name: 'poland', image: require('../../assets/images/countries/poland.png') },
];

const CountryScreen = () => {
  // Create a debounced speak function
  const debouncedSpeakCountry = useCallback(
    debounce((countryName) => {
      Speech.speak(countryName); // Speaks the country's name
    }, 200),
    []
  );

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
                onPress={() => debouncedSpeakCountry(country.name)} // Use the debounced function
              >
                <Image source={country.image} style={styles.countryImage} />
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
    height: width / 2, // Square-shaped container for each country
    margin: 12,
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
