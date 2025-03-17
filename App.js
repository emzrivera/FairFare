import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
        'Poppins-Bold': require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return <TabNavigator />;
}
