import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; // Import expo-speech
import { SafeAreaView } from 'react-native-safe-area-context';

// Questions with images and correct answers
const questions = [
  {
    questionText: "Fruit",
    hintImages: [
      require('../../assets/images/Fruits.jpg'),
      require('../../assets/images/Country.png'),
      require('../../assets/images/Alphabet.jpg'),
      require('../../assets/images/Geometrys.png'),
    ],
    correctAnswer: 0, // Index of the correct answer (image 1)
  },
  {
    questionText: "Animal",
    hintImages: [
      require('../../assets/images/Country.png'),
      require('../../assets/images/Colours.jpg'),
      require('../../assets/images/Animal.png'),
      require('../../assets/images/Geometrys.png'),
    ],
    correctAnswer: 2, // Index of the correct answer (image 3)
  },
  // More questions as needed
];

export default function GameScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  // Function to handle text-to-speech for the current question
  const handleSpeak = () => {
    Speech.speak(currentQuestion.questionText, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  };

  // Shuffle the images and set the correct answer
  const shuffleImages = (question) => {
    const shuffledImages = [...question.hintImages];
    // Shuffle the images randomly
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }

    // After shuffling, set the correct answer based on the shuffled images
    const correctAnswerIndex = shuffledImages.indexOf(question.hintImages[question.correctAnswer]);
    return { ...question, hintImages: shuffledImages, correctAnswer: correctAnswerIndex };
  };

  // Function to handle the answer selection
  const handleAnswerSelect = (index) => {
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      Alert.alert('Wrong!', 'Try Luck Next Time');
    }

    // Automatically move to the next question after selection
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = shuffleImages(questions[currentQuestionIndex + 1]);
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameFinished(true); // End the game when there are no more questions
    }
  };

  // Navigate to next question manually
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = shuffleImages(questions[currentQuestionIndex + 1]);
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to previous question manually
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = shuffleImages(questions[currentQuestionIndex - 1]);
      setCurrentQuestion(prevQuestion);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Restart game
  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameFinished(false);
    const firstQuestion = shuffleImages(questions[0]);
    setCurrentQuestion(firstQuestion);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isGameFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Game Over</Text>
          <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
          <Button title="Restart" onPress={handleRestartGame} />
        </View>
      ) : (
        <>
          {/* Display current question number */}
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

          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.arrowButton} onPress={handlePrevQuestion}>
              <MaterialIcons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowButton} onPress={handleNextQuestion}>
              <MaterialIcons name="arrow-forward" size={30} color="white" />
            </TouchableOpacity>
          </View>
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
    flexWrap: 'wrap', // Allows wrapping the images in rows
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  hintWrapper: {
    width: '48%', // To make two images per row, leaving space for margin
    marginBottom: 10,
    marginHorizontal: '1%', // Adds margin between images
  },
  hintImage: {
    width: '100%', // Make image take up the full width of its container
    height: 120,
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  arrowButton: {
    backgroundColor: '#3F3DFF',
    padding: 10,
    borderRadius: 50,
  },
});
