import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for chevron-back
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: true, // Default: Show header
            headerTitle: '', // Hide the screen title
            headerBackTitleVisible: false, // Hide the default back button text
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
              height: 44, // Typical iPhone header height
              paddingVertical: 0, // Remove vertical padding for smaller header
              borderBottomWidth: 0, // No shadow or border under the header
            },
            headerTintColor: colorScheme === 'dark' ? '#fff' : '#000', // Back button color
            headerShadowVisible: false, // Remove header shadow
            headerLeft: ({ canGoBack }) =>
              canGoBack ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()} // Trigger goBack on press
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 5, // Adjust left margin to position the back button
                  }}
                >
                  <Ionicons
                    name="chevron-back" // Ionicons back arrow icon
                    size={28} // Larger size for better visibility
                    color={colorScheme === 'dark' ? '#fff' : '#000'}
                  />
                  <Text
                    style={{
                      color: colorScheme === 'dark' ? '#fff' : '#000',
                      fontSize: 16, // Customize text size
                      marginLeft: 1, // Space between the icon and text
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
              ) : null,
          }}
        >
          <Stack.Screen
            name="screens/home"
            options={{
              headerShown: false, // Hide header for Home.jsx
            }}
          />
          <Stack.Screen name="+not-found" />
          {/* Other screens will inherit the default header settings */}
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
