import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function CalculateScreen() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  // const [fare, setFare] = useState("");
  const navigation = useNavigation();

  const handleCalculateFare = () => {
    if (startLocation && endLocation) {
      navigation.navigate("FareResult", { startLocation, endLocation});
    } else {
      Alert.alert("Missing Input", "Please enter all fields before proceeding.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/home-bg.png')} style={styles.bgImage} />

      <Text style={styles.heading}>Where to?</Text>
      <Ionicons name="help-circle" size={24} color={COLORS.primary} style={styles.helpIcon} />

      <Text style={styles.inputlabel}>From</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="location" size={20} color={COLORS.primary} style={styles.icon} />
        <TextInput placeholder="Yu Boarding House, Queborac..." style={styles.input} onChangeText={setStartLocation} />
      </View>

      <Text style={styles.inputlabel}>To</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="location" size={20} color={COLORS.primary} style={styles.icon} />
        <TextInput placeholder="McDonald's Magsaysay, Magsay..." style={styles.input} onChangeText={setEndLocation} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCalculateFare}>
        <Text style={styles.buttonText}>Calculate Fare</Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('../assets/farecard-bg.png')}
        style={styles.fareCardBackground}
        imageStyle={{ borderRadius: 10 }}
        >
        <Text style={styles.fareTitle}>FARE RATES</Text>
            <LinearGradient colors={['rgba(255, 165, 0, 0.8)', 'rgba(255, 215, 0, 0.8)']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientContainer}>
            <View style={styles.row}>
                <Text style={styles.leftcell}>Regular Fare</Text>
                <Text style={styles.rightcell}>₱15.00</Text>
            </View>
            </LinearGradient>

            <LinearGradient colors={['rgba(255, 165, 0, 0.8)', 'rgba(255, 215, 0, 0.8)']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientContainer}>
            <View style={styles.row}>
                
                <Text style={styles.leftcell}>Discounted Fare</Text>
                <Text style={styles.rightcell}>₱13.00</Text>
            </View>
            </LinearGradient>

            <LinearGradient colors={['rgba(255, 165, 0, 0.8)', 'rgba(255, 215, 0, 0.8)']}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientContainer}>
            <View style={styles.row}>
                <Text style={styles.leftcell}>Special Ride</Text>
                <Text style={styles.rightcell}>₱60.00</Text>
            </View>
            </LinearGradient>
      </ImageBackground>

      {/* Recent Rides */}
      <Text style={styles.trackTitle}>Track Recent Rides</Text>
      <View style={styles.tracktable}>
        <View style={styles.trackrow}>
            <Text style={styles.lCell}>Concepcion - Panganiban</Text>
            <Text style={styles.rCell}>₱50.00</Text>
        </View>
        <View style={styles.trackrow}>
            <Text style={styles.lCell}>Ateneo Ave. - Centro</Text>
            <Text style={styles.rCell}>₱15.00</Text>
        </View>
        <View style={styles.trackrow}>
            <Text style={styles.lCell}>University of... - Robinsons</Text>
            <Text style={styles.rCell}>₱65.00</Text>
        </View>
      </View>
      
      {/* View History Button */}
      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyText}>See Full Ride History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: COLORS.white, 
    padding: 20, 
    paddingTop: 80
},
bgImage: {
    position: 'absolute', // Allows positioning anywhere
    top: -80,   // Moves image to the top
    left: -50
  },
  heading: { 
    fontSize: 30, 
    fontFamily: FONTS.bold, 
    color: COLORS.black, 
    padding: 15
},
  helpIcon: { 
    color: COLORS.yellow,
    position: 'absolute', 
    right: 20, 
    top: 20
},
 inputlabel: {
    color: COLORS.fontgray,
    fontSize: 12,
    marginHorizontal: 15,
    marginVertical: 5,
},
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.white, 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 5, 
    marginBottom: 20,
    marginHorizontal:  15, 
    borderColor: COLORS.fontgray, 
    borderWidth: 1
},
  icon: { 
    marginRight: 10 
},
  input: { 
    flex: 1, 
    fontSize: 16 
},
  button: { 
    backgroundColor: COLORS.yellow, 
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 10,
    marginHorizontal:  15
},
  buttonText: { 
    fontSize: 18, 
    color: COLORS.white, 
    fontFamily: FONTS.bold 
},
  fareCardBackground: {
  width: '100%',
  padding: 20,
  marginHorizontal: 17,
  marginVertical: 20,
  alignContent: 'center',
  justifyContent: 'center',
},

  fareTitle: { 
    fontSize: 20, 
    fontFamily: FONTS.bold, 
    color: COLORS.brown, 
    marginBottom: 10,
    marginLeft: 25
},
  gradientContainer: {
    width: '60%',
    marginLeft: -20,
    marginVertical: 2
},
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 20,
    HorizontalAlign: 'center'
},
  leftcell: {
    fontSize: 12,
    flex: 1,
    color: COLORS.brown
},
  rightcell: {
    fontSize: 14,
    fontWeight: 700,
    flex: 1,
    color: COLORS.brown,
    textAlign: 'right',
},
  trackTitle: { 
    fontSize: 18, 
    fontFamily: FONTS.bold, 
    padding: 15
},
  tracktable: {
    width: '100%',
    padding: 20,
    paddingTop: 0,
    overflow: 'hidden',
  },
  trackrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  lCell: {
    fontSize: 16,
    color: COLORS.fontgray,
    flex: 1
  },
  rCell: {
    fontSize: 16,
    color: COLORS.fontgray,
    textAlign: 'right',
    minWidth: 60, // Ensures prices align properly
  },
  rideText: { 
    fontSize: 16, 
    color: COLORS.black, 
    marginBottom: 5 
},
  historyButton: { 
    borderColor: COLORS.fontgray, 
    borderWidth: 1, 
    padding: 5, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginHorizontal: 15,
    marginBottom: 50
},
  historyText: { 
    fontSize: 16, 
    color: COLORS.fontgray, 
    // fontFamily: FONTS.bold 
},
});
