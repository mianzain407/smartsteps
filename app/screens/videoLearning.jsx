import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const courses = [
  {
    title: 'Alphabet',
    instructor: 'Welcome to ABC',
    image: require('../../assets/images/Alphabet.jpg'),
    videoUrl: 'https://www.youtube.com/embed/kpy6QEAuLJw?autoplay=1',
  },
  {
    title: 'Number',
    instructor: 'Let count numbers',
    image: require('../../assets/images/Number.jpg'),
    videoUrl: 'https://www.youtube.com/embed/ozDX0kkf8hM?autoplay=1',
  },
  {
    title: 'Colours',
    instructor: 'Welcome to the world of colours',
    image: require('../../assets/images/Colours.jpg'),
    videoUrl: 'https://www.youtube.com/embed/tkpfg-1FJLU?autoplay=1',
  },
  {
    title: 'Fruits',
    instructor: 'Let see fruits together',
    image: require('../../assets/images/Fruits.jpg'),
    videoUrl: 'https://www.youtube.com/embed/aucmuMTEjIY?autoplay=1',
  },
  {
    title: 'Animal',
    instructor: 'Learn about animals',
    image: require('../../assets/images/Animal.png'),
    videoUrl: 'https://www.youtube.com/embed/wWPGwfyAKkM?autoplay=1',
  },
  {
    title: 'Country',
    instructor: 'Learn about countries',
    image: require('../../assets/images/Country.png'),
    videoUrl: 'https://www.youtube.com/embed/tk54tybepac?autoplay=1',
  },
  {
    title: 'Geometry',
    instructor: 'Explore geometry shapes',
    image: require('../../assets/images/Geometrys.png'),
    videoUrl: 'https://www.youtube.com/embed/ohaXcHwUWY0?autoplay=1',
  },
];

export default function CourseScreen() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Section */}
      {selectedCourse && (
        <View style={styles.videoContainer}>
          <TouchableOpacity onPress={() => setSelectedCourse(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.webviewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ uri: selectedCourse.videoUrl }}
              style={styles.webview}
              javaScriptEnabled={true}
              allowsFullscreenVideo={false}
            />
          </View>
        </View>
      )}

      {/* Course List */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseCard}
            onPress={() => setSelectedCourse(course)}
          >
            <Image source={course.image} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  videoContainer: {
    width: '100%',
    height: height * 0.255, // 25% of the screen height
    marginBottom: 5, // Add some space below the video
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginLeft: 15, 
    marginRight :15,
    marginTop:15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  webviewContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});
