import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

// Import your screens
import CalculateScreen from '../screens/CalculateScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReportScreen from '../screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Calculate') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.brown, // Active tab color (Orange)
          tabBarInactiveTintColor: COLORS.white, // Inactive tab color (Gray)
          tabBarStyle: {
            backgroundColor: COLORS.yellow,
            paddingTop: 5,
            height: 80, // Adjust height
          },
          headerShown: false, // Hide top navigation bar
        })}
      >
        <Tab.Screen name="Calculate" component={CalculateScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
