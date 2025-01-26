import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const GraphScreen = () => {
  const [scores, setScores] = useState([]);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchScoresAndUserData = async () => {
      try {
        // Fetch quiz scores from AsyncStorage
        const storedScores = await AsyncStorage.getItem('quizScores');
        const scores = storedScores ? JSON.parse(storedScores) : [];
        setScores(scores);

        // Fetch user data (first name) from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setFirstName(parsedUserData.firstName || ''); // Set the first name
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchScoresAndUserData();  
  }, []);

  const lineChartData = {
    labels: scores.map((_, index) => `Quiz ${index + 1}`), // X-axis labels as "Quiz 1", "Quiz 2", etc.
    datasets: [
      {
        data: scores, // Y-axis values are the scores
        strokeWidth: 2, // Optional: Customize the line width
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#1c92d2',
    backgroundGradientTo: '#f2fcfe',
    decimalPlaces: 0, // No decimals for scores
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Display the user's first name */}
        <Text style={styles.heading}>{firstName}'s Report</Text>
        {scores.length > 1 ? (
          <ScrollView horizontal contentContainerStyle={styles.graphContainer}>
            <LineChart
              data={lineChartData}
              width={scores.length * 80} // Dynamically calculate width based on data
              height={400} // Increased height
              chartConfig={chartConfig}
              bezier // Smooth curve
              fromZero // Start Y-axis from zero
              yAxisInterval={1} // Y-axis step interval
            />
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>No scores available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  graphContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default GraphScreen;
