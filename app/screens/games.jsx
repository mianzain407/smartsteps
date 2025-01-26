import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

// PuzzlePiece Component (Represents each draggable piece)
const PuzzlePiece = ({ piece, position, onGestureEvent, onHandlerStateChange }) => {
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <View style={[styles.puzzlePiece, { left: position.x, top: position.y }]}>
        <Text style={styles.pieceText}>{piece}</Text>
      </View>
    </PanGestureHandler>
  );
};

// PuzzleGame Component (Manages the game state and pieces)
const PuzzleGame = () => {
  const word = 'APPLE'; // Word to form
  const alphabet = word.split(''); // Split word into letters (pieces)
  const shuffledAlphabet = [...alphabet].sort(() => Math.random() - 0.5); // Shuffle the letters

  // Window width and height
  const { width, height } = Dimensions.get('window');

  const numColumns = 5; // Number of columns for arranging the pieces (one per letter)
  const pieceSize = 60; // Fixed size of each puzzle piece
  const gap = 10; // Gap between pieces
  const dropZoneSize = { width: pieceSize * numColumns + gap * (numColumns + 1), height: pieceSize }; // Drop zone size
  const dropZonePosition = { x: (width - dropZoneSize.width) / 2, y: (height - dropZoneSize.height) / 2 }; // Centered drop zone

  const [pieces, setPieces] = useState(
    shuffledAlphabet.map((letter, index) => ({
      id: index,
      piece: letter,
      position: {
        x: (width / 2 - dropZoneSize.width / 2) + (index * (pieceSize + gap)), // Distribute pieces horizontally
        y: 100, // Start pieces above the drop zone
      },
    }))
  );

  // Gesture Event Handlers
  const onGestureEvent = (event, pieceId) => {
    const { translationX, translationY } = event.nativeEvent;
    const speedFactor = 0.02;
    setPieces((prev) =>
      prev.map((p) =>
        p.id === pieceId
          ? {
              ...p,
              position: {
                x: Math.max(0, Math.min(width - pieceSize, p.position.x + translationX * speedFactor)),
                y: Math.max(0, Math.min(height - pieceSize, p.position.y + translationY * speedFactor)),
              },
            }
          : p
      )
    );
  };

  const onHandlerStateChange = (event, pieceId) => {
    const { x, y } = pieces.find((p) => p.id === pieceId).position;

    if (event.nativeEvent.state === 5) { // Gesture End (drop)
      if (
        x > dropZonePosition.x &&
        x < dropZonePosition.x + dropZoneSize.width &&
        y > dropZonePosition.y &&
        y < dropZonePosition.y + dropZoneSize.height
      ) {
        // Remove the piece from the pieces array to make it disappear
        setPieces((prev) => prev.filter((p) => p.id !== pieceId));
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.gameContainer}>
          {/* Display the image background */}
          <Image source={require('../../assets/images/Alphabet.jpg')} style={styles.imageBackground} />

          {/* Dustbin */}
          <View
            style={[
              styles.dropZone,
              { left: dropZonePosition.x, top: dropZonePosition.y, width: dropZoneSize.width, height: dropZoneSize.height },
            ]}
          >
            <Text style={styles.dropZoneText}>Dustbin</Text>
          </View>

          {/* Puzzle Pieces */}
          <View style={styles.piecesContainer}>
            {pieces.map((item) => (
              <PuzzlePiece
                key={item.id}
                piece={item.piece}
                position={item.position}
                onGestureEvent={(event) => onGestureEvent(event, item.id)}
                onHandlerStateChange={(event) => onHandlerStateChange(event, item.id)}
              />
            ))}
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gameContainer: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2, // Adjust opacity to show background
  },
  puzzlePiece: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    zIndex: 1,
  },
  pieceText: {
    fontSize: 20,
    color: 'white',
  },
  dropZone: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker color for dustbin
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black', // Black border for the dustbin
  },
  dropZoneText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  piecesContainer: {
    position: 'absolute',
    top: -150,
    left: -5,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PuzzleGame;
