/* 
Authored by: Ela Mariz Z. Rivera
Company: Qwerty
Project: Fair Fare
Feature: [FF-16] Calculated Screen Frontend
Description: Fair Fare Calculation Result Screen with total calculated fare and calculation breakdown
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function FareResultsScreen({ route }) {
  const { startLocation, endLocation} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255, 215, 0, 1)', 'rgba(255, 166, 0, 1)']} style={styles.banner}>
        <Image source={require('../assets/result-bg.png')} style={styles.bgImage} />
        <View style={styles.header}>
          <Text style={styles.heading}>Fare Calculated</Text>
          <Ionicons 
            name="close-outline" 
            size={30} 
            color={COLORS.black} 
            style={styles.icon} 
            onPress={() => navigation.goBack()} 
          />
        </View>

        <Text style={styles.bannertext}>Fare</Text>
        <Text style={styles.bannerammount}>₱ 0.00</Text>
        <Text style={styles.bannertext}>Distance</Text>
        <Text style={styles.bannerammount}>0.0 km</Text>
      </LinearGradient>

      <View style={styles.lowercontainer}>


      <View style={styles.pointContainer}>
          <Ionicons name="location" size={20} color={COLORS.yellow} style={styles.icon} />
          <Text style={styles.location}>Pickup from</Text>
      </View>
      <Text style={styles.locinfo}>{startLocation}</Text>
      
      <View style={styles.pointContainer}>
          <Ionicons name="location" size={20} color={COLORS.yellow} style={styles.icon} />
          <Text style={styles.location}>Going to</Text>
      </View>
      <Text style={styles.locinfo}>{endLocation}</Text>

      <Text style={styles.distanceinfo}>0.0 km, approx. 0 minutes</Text>

      <Text style={styles.headtext}>Fare Calculation</Text>

      <View style={styles.table}>
        <View style={styles.tbrow}>
          <Text style={styles.left}>Basic Fare</Text>
          <Text style={styles.right}>₱ 7.00/km</Text>
        </View>
        <View style={styles.tbrow}>
          <Text style={styles.left}>Distance Fee</Text>
          <Text style={styles.right}>₱ 0.00</Text>
        </View>
        <View style={styles.tbrow}>
          <Text style={styles.left}>Discount</Text>
          <Text style={styles.right}>₱ 0.00</Text>
        </View>
        <View style={styles.tbrow}>
          <Text style={styles.left}>Total</Text>
          <Text style={styles.right}>₱ 0.00</Text>
        </View>
      </View>

      
        <TouchableOpacity style={styles.CompleteButton} onPress={() => navigation.navigate('History')}>
            <Text style={styles.CompleteText}>Complete</Text>
        </TouchableOpacity>
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
container: { 
  flex: 1,
  backgroundColor: COLORS.white, 
  padding: 20, 
},
banner: {
  borderBottomLeftRadius: 70,
  margin: -20,
  height: '40%',
  paddingTop: 80,
  padding: 50,
},
bgImage: {
  position: 'absolute',
  right: -50,
  bottom: -10,
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
heading: {
  fontSize: 28,
  fontWeight: "bold",
  color: COLORS.black, 
},
bannertext: {
  fontSize: 14,
  color: COLORS.white,
  marginLeft: 20,
  marginTop: 30
},
bannerammount: {
  fontSize: 30,
  color: COLORS.white,
  fontFamily: FONTS.bold,
  marginLeft: 20,
  marginBottom: -10
},
lowercontainer: {
  padding: 20,
  marginVertical: 30,
},
pointContainer: {
  flexDirection: 'row',
  width: '30%'
},
location: {
  marginLeft: 10,
  color: COLORS.fontgray,
  fontSize: 16,
},
locinfo: {
  marginLeft:30,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 30,
},
distanceinfo: {
  color: COLORS.fontgray,
  fontSize: 16,
  marginBottom: 30
},
headtext: {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 5,
  marginTop: 5
},
table: {
  width: '100%',
  padding: 20,
  paddingTop: 0,
  overflow: 'hidden',
  marginBottom: 10,
},
tbrow: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
},
left: {
  color: COLORS.fontgray,
  fontSize: 16,
},
right: {
  color: COLORS.fontgray,
  fontSize: 16,
  textAlign: 'right'
},
CompleteButton: {
  backgroundColor: COLORS.yellow, 
  borderWidth: 3,
  borderColor: COLORS.yellow,
  padding: 10, 
  borderRadius: 12, 
  alignItems: 'center',
  color: COLORS.white,
},
CompleteText: {
  color: COLORS.white,
  fontSize: 18,
  fontWeight: 800,
},
});
