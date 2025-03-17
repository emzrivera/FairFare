import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

// Import screens
import CalculateScreen from '../screens/CalculateScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReportScreen from '../screens/ReportScreen';
import FareResultScreen from '../screens/FareResultsScreen'; // New screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Calculate tab
function CalculateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalculateMain" component={CalculateScreen} />
      <Stack.Screen name="FareResult" component={FareResultScreen} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

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
          tabBarActiveTintColor: COLORS.brown,
          tabBarInactiveTintColor: COLORS.white,
          tabBarStyle: {
            backgroundColor: COLORS.yellow,
            paddingTop: 5,
            height: 80,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Calculate" component={CalculateStack} />
        <Tab.Screen name="History" component={HistoryStack} />
        <Tab.Screen name="Report" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
