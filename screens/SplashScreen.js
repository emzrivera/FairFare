import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS, FONTS } from '../constants/theme';

export default function SplashScreenComponent() {
  const navigation = useNavigation();

  useEffect(() => {
    const loadApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        setTimeout(async () => {
          await SplashScreen.hideAsync();
          navigation.replace('Onboarding');
        }, 2000);
      } catch (e) {
        console.warn(e);
      }
    };

    loadApp();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255, 215, 0, 1)', 'rgba(255, 166, 0, 1)']} style={styles.banner}>
        <Text style={styles.text}>Fair Fare</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Image source={require('../assets/company-logo.png')} style={styles.companylogo} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.yellow,
    },
    banner: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 40,
      fontFamily: FONTS.bold,
      color: COLORS.white,
      marginBottom: 20,
    },
    logo: {
      width: 266,
      height: 196,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    companylogo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 50,          
      alignSelf: 'center',
    },
  });
  