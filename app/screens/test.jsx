import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { WebView } from 'react-native-webview';

const PuzzleGame = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://www.digipuzzle.net/digipuzzle/kids/puzzles/puzzle_jigsaw.htm?language=english&linkback=../../../main/kids/index.htm' }}
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});

export default PuzzleGame;
