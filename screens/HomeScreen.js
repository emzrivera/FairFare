import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getFares } from '../lib/api';
  import Constants from 'expo-constants';
  const MAPBOX_TOKEN = Constants.expoConfig.extra.mapboxToken;
const DROPDOWN_OPTIONS = ['Regular', 'Senior', 'PWD'];

function CustomDropdown({ selected, onSelect }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(!visible)}>
        <Text style={styles.selectedText}>{selected}</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.yellow} />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdownMenu}>
          {DROPDOWN_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                setVisible(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function CalculateScreen() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [passengerType, setPassengerType] = useState('Regular');
  const navigation = useNavigation();
  const [fares, setFares] = useState({});



  const geocodePlace = async (placeName, apiKey) => {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(placeName)}&size=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].geometry.coordinates;
    return { lat, lng };
  } else {
    throw new Error(`Location not found: ${placeName}`);
  }
};

const getDistanceORS = async (start, end, apiKey) => {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;
  const res = await fetch(url);
  const data = await res.json();

  const distanceInKm = data.features[0].properties.summary.distance / 1000;
  return distanceInKm;
};

const handleCalculateFare = async () => {
  if (!startLocation || !endLocation) {
    Alert.alert("Missing Input", "Please enter both start and end location.");
    return;
  }

  try {
    const ORS_API_KEY = '5b3ce3597851110001cf6248e6e988c68cf04d76948e6a0f17c03b61'; // or load from env
    const startCoords = await geocodePlace(startLocation, ORS_API_KEY);
    const endCoords = await geocodePlace(endLocation, ORS_API_KEY);
    const distance = await getDistanceORS(startCoords, endCoords, ORS_API_KEY);

    let rate;
  let estimatedFare;

  if (passengerType.toLowerCase() === 'special') {
    rate = fares.special;
    estimatedFare = (distance / 5) * rate;
  } else if (passengerType.toLowerCase() === 'Regular') {
    rate = fares.regular;
    estimatedFare = (distance / 2) * rate;
  } else {
    rate = fares.discounted;
    estimatedFare = (distance / 2) * rate;
  }

estimatedFare = Math.ceil(estimatedFare);

    navigation.navigate("FareResult", {
      startLocation,
      endLocation,
      distance,
      estimatedFare,
    });
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Unable to calculate fare. Check locations.");
  }
};

  
  useFocusEffect(
    React.useCallback(() => {
      const fetchFares = async () => {
        const data = await getFares();
        const map = {};
        data.forEach(fare => {
          map[fare.type] = fare.price;
        });
        setFares(map);
      };
      fetchFares();
    }, [])
  );


  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <LinearGradient colors={['rgba(255, 215, 0, 1)', 'rgba(255, 166, 0, 1)']} style={styles.banner}>
        <Image source={require('../assets/home-bg.png')} style={styles.bgImage} />
        </LinearGradient>
      <View style={styles.container}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Start Your Ride</Text>
          <Ionicons name="help-circle" size={40} color={COLORS.primary} style={styles.helpIcon} />
        </View>


        <View style={styles.locationInputContainer}>

          <View style={styles.floatingInputWrapper}>
            <Text style={styles.floatingLabel}>From</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location" size={25} color={COLORS.primary} style={styles.icon} />
              <TextInput
                placeholder="Enter Starting Point"
                style={styles.input}
                onChangeText={setStartLocation}
              />
            </View>
          </View>

          <View style={styles.floatingInputWrapper}>
            <Text style={styles.floatingLabel}>To</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location" size={25} color={COLORS.primary} style={styles.icon} />
              <TextInput
                placeholder="Enter Destination"
                style={styles.input}
                onChangeText={setEndLocation}
              />
            </View>
          </View>

          <CustomDropdown selected={passengerType} onSelect={setPassengerType} />


          <TouchableOpacity style={styles.button} onPress={handleCalculateFare}>
            <Text style={styles.buttonText}>Calculate Fare</Text>
          </TouchableOpacity>
        </View>
      
      <View style = {styles.fareTitleContainer}>
        <Text style={styles.fareTitle}>Fare Rates</Text>
        <TouchableOpacity style={styles.fareDetailsButton}>
          <Text style={styles.fareDetails}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fareRatesContainer}>
        <ImageBackground source={require('../assets/fare-card-1.png')} style={styles.fareCard} imageStyle={styles.fareCardImage}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Regular Fare</Text>
                <Text style={styles.cardFare}>₱{fares.regular}</Text>
                <Text style={styles.cardDesc}>2km</Text>
            </View>
        </ImageBackground>

        <ImageBackground source={require('../assets/fare-card-2.png')} style={styles.fareCard} imageStyle={styles.fareCardImage}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Discounted</Text>
                <Text style={styles.cardFare}>₱{fares.discounted}</Text>
                <Text style={styles.cardDesc}>Student, Senior</Text><Text style={styles.cardDesc}> Citizen, PWD</Text>
            </View>
        </ImageBackground>

        <ImageBackground source={require('../assets/fare-card-3.png')} style={styles.fareCard} imageStyle={styles.fareCardImage}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Special</Text>
                <Text style={styles.cardFare}>₱{fares.special}</Text>
                <Text style={styles.cardDesc}>5km</Text>
            </View>
        </ImageBackground>
      </View>

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

      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyText}>See Full Ride History</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    paddingTop: 80
},

banner: {
  position: 'absolute',
  borderBottomLeftRadius: 25,
  width: '100%',
  height: 350,
},

bgImage: {
  position: 'absolute',
  width: '100%',
  height: 350,
},

headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 15,
},

  heading: { 
    fontSize: 32, 
    fontWeight: "bold",
    color: COLORS.white, 
},
  helpIcon: { 
    color: COLORS.white,
},

locationInputContainer: {
  backgroundColor: COLORS.white,
  paddingTop: 40,
  paddingBottom: 30,
  paddingHorizontal: 25,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: COLORS.yellow,
  marginVertical: 15,
  marginBottom: 15,
},

 floatingInputWrapper: {
  position: 'relative',
  marginBottom: 25,
},

floatingLabel: {
  position: 'absolute',
  top: -8,
  left: 30,
  zIndex: 1,
  backgroundColor: COLORS.white,
  paddingHorizontal: 10,
  fontSize: 12,
  color: COLORS.fontgray,
},

inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.white,
  padding: 15,
  borderRadius: 10,
  borderColor: COLORS.yellow,
  borderWidth: 1,
},

  icon: { 
    marginRight: 10,
    color: COLORS.yellow,
},
  input: { 
    flex: 1, 
    fontSize: 16 
},
dropdown: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingVertical: 10,
  backgroundColor: '#FFF7DC',
  borderColor: COLORS.yellow,
  borderRadius: 10,
  borderWidth: 1,
},

selectedText: {
  fontSize: 16,
  color: COLORS.brown,
},

dropdownMenu: {
  backgroundColor: COLORS.white,
  borderColor: COLORS.yellow,
  // borderBottomWidth:0,
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 5,
  elevation: 5,
  overflow: 'hidden',
},

option: {
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderBottomWidth: 0.5,
  borderBottomColor: '#f0e6b6',
},

optionText: {
  fontSize: 15,
  color: COLORS.brown,
},

  button: { 
    backgroundColor: COLORS.yellow, 
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center', 
},
  buttonText: { 
    fontSize: 18, 
    color: COLORS.white, 
    fontFamily: FONTS.bold 
},

fareTitleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 15,
  
},

fareTitle: { 
  fontSize: 22, 
  fontFamily: FONTS.bold, 
  color: COLORS.black, 
},

fareDetails: {
  fontSize: 16,
  color: COLORS.fontgray
},

fareRatesContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,
  paddingHorizontal: 15,
},

fareCard: {
  width: 110,
  aspectRatio: 3 / 3.2, // control height
  borderRadius: 10,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: COLORS.yellow,
  backgroundColor: 'transparent',
  justifyContent: 'flex-start',
  padding: 10,

},

fareCardImage: {
  resizeMode: 'cover',
  borderRadius: 12,
},

cardContent: {
  position: 'relative',
  alignItems: 'center',
  marginTop: 20,
},

cardTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: COLORS.brown,
},

cardFare: {
  fontSize: 20,
  fontWeight: 'bold',
  color: COLORS.yellow,
},

cardDesc: {
  fontSize: 10,
  color: COLORS.fontgray,
},

trackTitle: { 
  fontSize: 22, 
  fontFamily: FONTS.bold, 
  color: COLORS.brown, 
  paddingBottom: 10,
  padding: 15,
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