import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Questions with images and correct answers
const questions = [
  {
    questionText: "Apple",
    hintImages: [
      require('../../assets/images/fruits/apple.png'),
      require('../../assets/images/fruits/pineapple.png'),
      require('../../assets/images/fruits/cherry.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "china",
    hintImages: [
      require('../../assets/images/country/Canada.png'),
      require('../../assets/images/country/china.png'),
      require('../../assets/images/country/Philippines.png'),
      require('../../assets/images/country/italy.png'),
    ],
    correctAnswer: 1,
  },
  {
    questionText: "Lion",
    hintImages: [
      require('../../assets/images/animals/elephant.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/camel.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 1,
  },
  {
    questionText: "litchi",
    hintImages: [
      require('../../assets/images/fruits/apple.png'),
      require('../../assets/images/fruits/pineapple.png'),
      require('../../assets/images/fruits/cherry.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 3,
  },
  {
    questionText: "canada",
    hintImages: [
      require('../../assets/images/country/Canada.png'),
      require('../../assets/images/country/china.png'),
      require('../../assets/images/country/Philippines.png'),
      require('../../assets/images/country/italy.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "sheep",
    hintImages: [
      require('../../assets/images/animals/elephant.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/camel.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 3,
  },
  {
    questionText: "cross",
    hintImages: [
      require('../../assets/images/geomatry/diamond.png'),
      require('../../assets/images/geomatry/cross.png'),
      require('../../assets/images/geomatry/heart.png'),
      require('../../assets/images/geomatry/triangle.png'),
    ],
    correctAnswer: 1,
  },
  {
    questionText: "cherry",
    hintImages: [
      require('../../assets/images/fruits/apple.png'),
      require('../../assets/images/fruits/pineapple.png'),
      require('../../assets/images/fruits/cherry.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "italy",
    hintImages: [
      require('../../assets/images/country/Canada.png'),
      require('../../assets/images/country/china.png'),
      require('../../assets/images/country/Philippines.png'),
      require('../../assets/images/country/italy.png'),
    ],
    correctAnswer: 3,
  },
  {
    questionText: "elephant",
    hintImages: [
      require('../../assets/images/animals/elephant.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/camel.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "tomato",
    hintImages: [
      require('../../assets/images/fruits/tomato.png'),
      require('../../assets/images/fruits/pineapple.png'),
      require('../../assets/images/fruits/cherry.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "pakistan",
    hintImages: [
      require('../../assets/images/country/Canada.png'),
      require('../../assets/images/country/china.png'),
      require('../../assets/images/country/Pakistan.png'),
      require('../../assets/images/country/italy.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "cow",
    hintImages: [
      require('../../assets/images/animals/elephant.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/cow.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "heart",
    hintImages: [
      require('../../assets/images/geomatry/diamond.png'),
      require('../../assets/images/geomatry/cross.png'),
      require('../../assets/images/geomatry/heart.png'),
      require('../../assets/images/geomatry/triangle.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "orange",
    hintImages: [
      require('../../assets/images/fruits/apple.png'),
      require('../../assets/images/fruits/orange.png'),
      require('../../assets/images/fruits/cherry.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 1,
  },
  {
    questionText: "uk",
    hintImages: [
      require('../../assets/images/country/Canada.png'),
      require('../../assets/images/country/china.png'),
      require('../../assets/images/country/United Kingdom.png'),
      require('../../assets/images/country/italy.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "chicken",
    hintImages: [
      require('../../assets/images/animals/chicken.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/camel.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "cocunut",
    hintImages: [
      require('../../assets/images/fruits/apple.png'),
      require('../../assets/images/fruits/pineapple.png'),
      require('../../assets/images/fruits/coconut.png'),
      require('../../assets/images/fruits/litchi.png'),
    ],
    correctAnswer: 2,
  },
  {
    questionText: "cat",
    hintImages: [
      require('../../assets/images/animals/cat.png'),
      require('../../assets/images/animals/Lion.png'),
      require('../../assets/images/animals/camel.png'),
      require('../../assets/images/animals/sheep.png'),
    ],
    correctAnswer: 0,
  },
  {
    questionText: "cross",
    hintImages: [
      require('../../assets/images/geomatry/diamond.png'),
      require('../../assets/images/geomatry/cross.png'),
      require('../../assets/images/geomatry/heart.png'),
      require('../../assets/images/geomatry/triangle.png'),
    ],
    correctAnswer: 1,
  },
];

export default function GameScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  // Speak with a 200ms delay
  const handleSpeak = () => {
    setTimeout(() => {
      Speech.speak(currentQuestion.questionText, {
        language: 'en',
        pitch: 1,
        rate: 1,
      });
    }, 400); // 200ms delay
  };

  const shuffleImages = (question) => {
    const shuffledImages = [...question.hintImages];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    const correctAnswerIndex = shuffledImages.indexOf(question.hintImages[question.correctAnswer]);
    return { ...question, hintImages: shuffledImages, correctAnswer: correctAnswerIndex };
  };

  const handleAnswerSelect = (index) => {
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      Alert.alert('Wrong!');
    }
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = shuffleImages(questions[currentQuestionIndex + 1]);
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  const handleGameEnd = async () => {
    try {
      const storedScores = await AsyncStorage.getItem('quizScores');
      const scores = storedScores ? JSON.parse(storedScores) : [];
      
      scores.push(score);
      
      // Keep only the latest 10 scores
      if (scores.length > 10) {
        scores.shift(); // Remove the oldest score
      }
      
      await AsyncStorage.setItem('quizScores', JSON.stringify(scores));
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  
  const handleRestartGame = () => {
    handleGameEnd();
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameFinished(false);
    const firstQuestion = shuffleImages(questions[0]);
    setCurrentQuestion(firstQuestion);
  };

  useEffect(() => {
    handleSpeak();
  }, [currentQuestion]);

  return (
    <SafeAreaView style={styles.container}>
      {isGameFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Finish</Text>
          <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
          <Button title="Restart" onPress={handleRestartGame} />
        </View>
      ) : (
        <>
          <Text style={styles.questionCountText}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <TouchableOpacity style={styles.speakButton} onPress={handleSpeak}>
            <MaterialIcons name="volume-up" size={30} color="white" />
            <Text style={styles.speakText}>Tap to Speak</Text>
          </TouchableOpacity>
          <View style={styles.hintsContainer}>
            {currentQuestion.hintImages.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleAnswerSelect(index)} style={styles.hintWrapper}>
                <Image source={image} style={styles.hintImage} />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.instructionText}>Select the correct hint above!</Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: -40,
  },
  questionCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 20,
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F3DFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  speakText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  hintsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    height: 300, // Increased height for the container
  },
  hintWrapper: {
    width: '48%',
    marginBottom: 10,
    marginHorizontal: '1%',
    height: 150, // Adjusted height for each option
  },
  hintImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#8D99AE',
    textAlign: 'center',
    marginTop: 20,
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    color: '#8D99AE',
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  arrowButton: {
    backgroundColor: '#3F3DFF',
    padding: 10,
    borderRadius: 50,
  },
});
