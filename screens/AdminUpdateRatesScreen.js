import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { updateFare } from '../lib/api';
import { getFares } from '../lib/api';

export default function UpdateRatesScreen() {

    const [fares, setFares] = useState({});
    
      useEffect(() => {
        const fetchFares = async () => {
          const data = await getFares();
          const map = {};
          data.forEach(fare => {
            map[fare.type] = fare.price;
          });
          setFares(map);
        };
        fetchFares();
    }, []);

    const [newRates, setNewRates] = useState({
    regular: '',
    discounted: '',
    special: '',
    });

    const handleUpdate = async () => {
  try {
    const parsedRegular = parseFloat(newRates.regular);
    const parsedDiscounted = parseFloat(newRates.discounted);
    const parsedSpecial = parseFloat(newRates.special);

    if (isNaN(parsedRegular) || isNaN(parsedDiscounted) || isNaN(parsedSpecial)) {
      Alert.alert('Invalid Input', 'Please enter valid numeric values for all fare types.');
      return;
    }

    await updateFare('regular', parsedRegular);
    await updateFare('discounted', parsedDiscounted);
    await updateFare('special', parsedSpecial);
    const updatedFares = await getFares();
    const map = {};
    updatedFares.forEach(fare => {
    map[fare.type] = fare.price;
    });
    setFares(map);

    Alert.alert('Success', 'Fares updated successfully!');
    setNewRates({
    regular: '',
    discounted: '',
    special: '',
    });

  } catch (error) {
    console.error('Update failed:', error);
    Alert.alert('Error', error.message);
  }
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Rates</Text>

      {/* Current Rates */}
      <Text style={styles.sectionHeader}>Current Rates</Text>

        <View style={styles.currentRateRow}>
          <Text style={styles.rateLabel}>Regular</Text>
          <Text style={styles.rateValue}>₱{fares.regular}</Text>
        </View>

        <View style={styles.currentRateRow}>
          <Text style={styles.rateLabel}>Discounted</Text>
          <Text style={styles.rateValue}>₱{fares.discounted}</Text>
        </View>

        <View style={styles.currentRateRow}>
          <Text style={styles.rateLabel}>Special</Text>
          <Text style={styles.rateValue}>₱{fares.special}</Text>
        </View>



      <View style={styles.divider} />

      {/* New Rates */}
      <Text style={styles.sectionHeader}>New Rates</Text>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Regular</Text>
          <TextInput
            style={styles.input}
            placeholder="₱0.00"
            keyboardType="numeric"
            value={newRates.regular}
            onChangeText={value =>
                setNewRates(prev => ({ ...prev, regular: value }))
            }
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Discounted</Text>
          <TextInput
            style={styles.input}
            placeholder="₱0.00"
            keyboardType="numeric"
            value={newRates.discounted}
            onChangeText={value =>
                setNewRates(prev => ({ ...prev, discounted: value }))
            }
          />
        </View>
        
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Special</Text>
          <TextInput
            style={styles.input}
            placeholder="₱0.00"
            keyboardType="numeric"
            value={newRates.special}
            onChangeText={value =>
                setNewRates(prev => ({ ...prev, special: value }))
            }
          />
        </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Rates</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    marginBottom: 25,
    paddingHorizontal: 15,
    paddingTop: 60,
    color: COLORS.black,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: COLORS.fontgray,
  },

  currentRateRow: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.boxgray,
    Horizontal: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  rateLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  rateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.yellow,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 30,
  },
  inputRow: {
    paddingTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '70%',
  },
  button: {
    marginTop: 30,
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18, 
    color: COLORS.white, 
    fontFamily: FONTS.bold 
  },
});
