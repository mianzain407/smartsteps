import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

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

const GeometryScreen = () => {
  const speakShape = (shapeName) => {
    Speech.speak(shapeName);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Geometrys.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {shapes.map((shape, index) => (
              <TouchableOpacity
                key={index}
                style={styles.shapeContainer}
                onPress={() => speakShape(shape.name)}
              >
                <Text style={styles.shapeText}>{shape.name}</Text>
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
    resizeMode: 'cover',
  },
  fixedContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  shapeContainer: {
    width: width / 3,
    height: width / 3,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  shapeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GeometryScreen;
