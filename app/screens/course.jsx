import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function CourseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      title: 'Alphabet',
      instructor: 'Welcome to ABC',
      image: require('../../assets/images/Alphabet.jpg'),
      route: '../screens/Alphabet',  // Route for Alphabet course
    },
    {
      title: 'Number',
      instructor: 'Let count numbers',
      image: require('../../assets/images/Number.jpg'),
      route: '../screens/number',  // Route for Number course
    },
    {
      title: 'Colours',
      instructor: 'Welcome to the world of colours',
      image: require('../../assets/images/Colours.jpg'),
      route: '../screens/colours',  // Route for Colours course
    },
    {
      title: 'Fruits',
      instructor: 'Let see fruits together',
      image: require('../../assets/images/Fruits.jpg'),
      route: '../screens/fruits',  // Route for Fruits course
    },
    {
      title: 'Animal',
      instructor: 'Learn about animals',
      image: require('../../assets/images/Animal.png'),
      route: '../screens/animals',  // Route for Animal course
    },
    {
      title: 'Country',
      instructor: 'Learn about countries',
      image: require('../../assets/images/Country.png'),
      route: '../screens/country',  // Route for Country course
    },
    {
      title: 'Geometry',
      instructor: 'Explore geometry shapes',
      image: require('../../assets/images/Geometrys.png'),
      route: '../screens/geometry',  // Route for Geometry course
    },
  ];

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlevideoLearning = () => {
    router.push('../screens/videoLearning');
  };

  const handlequiz = () => {
    router.push('../screens/Quiz');
  };
  const handlegame = () => {
    router.push('../screens/test');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Course</Text>
        <Image
          source={require('../../assets/images/illustration 01.png')}
          style={styles.profileImage}
        />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#B0B0B0" style={styles.searchIcon} />
        <TextInput
          placeholder="Find Course"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearchChange} // Update search query when typing
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="options-outline" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <View style={styles.categoryItem}>
          <Image source={require('../../assets/images/courseLearning.png')} style={styles.categoryImage} />
          <TouchableOpacity onPress= {handlegame} style={styles.categoryButton}>
            <Text style={styles.categoryText}>Games</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryItem}>
          <Image source={require('../../assets/images/gameLearning.png')} style={styles.categoryImage} />
          <TouchableOpacity  onPress= {handlequiz} style={styles.categoryButton}>
            <Text style={styles.categoryText}>Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Course Type Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabItemSelected}>
          <Text style={styles.tabTextSelected}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlevideoLearning} style={styles.tabItem}>
          <Text style={styles.tabText}>Video Learning</Text>
        </TouchableOpacity>
      </View>

      {/* Courses List */}
      <ScrollView style={styles.coursesContainer}>
        {filteredCourses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseCard}
            onPress={() => router.push(`/${course.route}`)} // Navigate to the respective course screen
          >
            <Image source={course.image} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop:-30,
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  filterIcon: {
    padding: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    width: (width - 60) / 2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E0E7FF',
  },
  categoryImage: {
    width: '100%',
    height: 100,
    resizeMode: 'stretch',
  },
  categoryButton: {
    position: 'absolute',
    bottom: 6,
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  tabItemSelected: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    marginRight: 10,
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  coursesContainer: {
    marginTop: 10,
    padding: 1,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#777',
    marginBottom: 14,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  courseHours: {
    fontSize: 12,
    color: '#FF6B6B',
  },
});
