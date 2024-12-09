import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash'; // Import your Splash screen
import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Quiz from '../screens/Quiz';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerMode:'none'
      }
    }
    >
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="Onboarding1" component={Onboarding1} screenOptions={{headerShown:false}} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />

      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

      {/* Main Application Screens */}
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}
