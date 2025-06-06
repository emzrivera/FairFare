import React from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

// Import screens
import SplashScreen from '../screens/SplashScreen'; // Added SplashScreen
import Onboarding from '../screens/Onboarding';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ReportScreen from '../screens/ReportScreen';
import FareResultScreen from '../screens/FareResultsScreen';

//admin screens
import AdminLogin from '../screens/AdminLoginScreen'; 
import AdminHome from '../screens/AdminHomeScreen';
import AdminUpdateRates from '../screens/AdminUpdateRatesScreen';
import AdminReport from '../screens/AdminReportScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Home tab
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="FareResult" component={FareResultScreen} />
    </Stack.Navigator>
  );
}

// Stack navigator for History tab
function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

function ReportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  );
}

function AdminHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
    </Stack.Navigator>
  );
}

function AdminUpdateRatesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminUpdateRates" component={AdminUpdateRates} />
    </Stack.Navigator>
  );
}

function AdminReportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminReportScreen" component={AdminReports} />
    </Stack.Navigator>
  );
}


// Bottom Tab Navigator
function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label;

          if (route.name === 'Home') {
            iconName = focused ? 'apps' : 'apps-outline';
            label = 'Dashboard';
          } else if (route.name === 'Update') {
            iconName = focused ? 'calculator' : 'calculator-outline';
            label = 'Rates';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'document-text' : 'document-text-outline';
            label = 'Reports';
          }

          return (
            <View style={{
              backgroundColor: focused ? COLORS.brown : 'transparent',
              width: size + 65,
              height: size + 25,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={iconName} size={size} color={focused ? '#fff' : color} />
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: focused ? '#fff' : color,
              }}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.brown,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          paddingTop: 15,
          paddingHorizontal: 30,
          height: 90,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={AdminHomeStack} />
      <Tab.Screen name="Update" component={AdminUpdateRatesStack} />
      <Tab.Screen name="Reports" component={AdminReportStack} />

    </Tab.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label;

          if (route.name === 'Home') {
            iconName = focused ? 'calculator' : 'calculator-outline';
            label = 'Calculate';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
            label = 'History';
          } else if (route.name === 'Report') {
            iconName = focused ? 'document-text' : 'document-text-outline';
            label = 'Report';
          }

          return (
            <View style={{
              backgroundColor: focused ? COLORS.brown : 'transparent',
              width: size + 65,
              height: size + 25,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={iconName} size={size} color={focused ? '#fff' : color} />
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: focused ? '#fff' : color,
              }}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.brown,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          paddingTop: 15,
          paddingHorizontal: 30,
          height: 90,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Report" component={ReportStack} />
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="AdminLogin" component={AdminLogin}/>
        <Stack.Screen name="AdminTab" component={AdminTabNavigator}/>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
