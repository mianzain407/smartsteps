import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSearchParams } from 'expo-router'; // Ensure this import is correct

export default function WebViewScreen() {
  const { url } = useSearchParams(); // Retrieve the `url` parameter passed from the CourseScreen

  return (
    <View style={styles.container}>
      {url ? (
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      ) : (
        <Text>No video URL provided</Text> // Show fallback message if URL is not found
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
