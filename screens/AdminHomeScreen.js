import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants/theme';
import { getFares } from '../lib/api';


export default function AdminDashboardScreen() {
  const [fares, setFares] = useState({});

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
          <Text style={styles.greeting}>Hello, Sir Kev!</Text>
          <Ionicons name="person-circle-outline" size={45} color="white" />
        </View>
        
        <View style={styles.rateCard}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Regular</Text>
            <Text style={styles.ratePrice}>₱{fares.regular}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Discounted</Text>
            <Text style={styles.ratePrice}>₱{fares.discounted}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Senior</Text>
            <Text style={styles.ratePrice}>₱{fares.special}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateRates')}>
          <Text style={styles.buttonText}>Update Rates</Text>
        </TouchableOpacity>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabelTop}>Total</Text>
            <Text style={styles.statLabel}>Reports</Text>
            <Text style={styles.statLabelSmall}>  Today  </Text>
            <Text style={styles.statValue}>13</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FFF7DC' }]}>
            <Text style={styles.statLabelTop}>Resolved</Text>
            <Text style={styles.statLabel}>  Cases  </Text>
            <Text style={styles.statLabelSmall}>This Month</Text>
            <Text style={styles.statValue}>28</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#FFF7DC' }]}>
          <Text style={styles.statLabelTop}>Pending</Text>
            <Text style={styles.statLabel}>  Cases  </Text>
            <Text style={styles.statValue}>4</Text>
          </View>

          <View style={styles.statBox}>
          <Text style={styles.assignedLabel}>Assigned Issues</Text>
            <Text style={styles.issueText}>• Report ID-10928</Text>
            <Text style={styles.issueText}>• Report ID-10928</Text>
          </View>
        </View>
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
  height: 330,
},

bgImage: {
  position: 'absolute',
  width: '100%',
  height: 340,
},

headerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 15,
  paddingVertical: 45,
},
  greeting: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  // date: {
  //   color: COLORS.white,
  //   marginTop: 10,
  // },
  // time: {
  //   color: COLORS.white,
  // },
  rateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 35,
    paddingVertical: 40,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  rateRow: {
    alignItems: 'center',
    
  },
  rateLabel: {
    fontSize: 16,
    color: COLORS.fontgray,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.boxgray
  },
  ratePrice: {
    fontSize:38,
    color: COLORS.yellow,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  button: { 
    backgroundColor: COLORS.yellow, 
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: 30,
},
  buttonText: { 
    fontSize: 18, 
    color: COLORS.white, 
    fontFamily: FONTS.bold 
},
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 25,
    margin: 8,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.boxgray
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.yellow,
  },
  statLabelTop: {
    fontSize: 18,
    color: COLORS.fontgray,
    fontWeight: '600',
  },
    statLabel: {
    fontSize: 18,
    color: COLORS.fontgray,
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.boxgray,
    paddingBottom: 5,
  },
  statLabelSmall: {
    paddingTop: 5,
    fontSize: 12,
    color: COLORS.fontgray,
  },
  assignedLabel: {
    fontSize: 16,
    color: COLORS.fontgray,
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.boxgray,
    paddingBottom: 5,
  },
  issueText: {
    paddingTop: 5,
    fontSize: 12,
    color: COLORS.brown,
  },
});
