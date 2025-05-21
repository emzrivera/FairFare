// [FF-003]

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RideHistoryCard from './components/RideHistoryCard'; 
import { COLORS, FONTS } from '../constants/theme';

export default function HistoryScreen() {
  const rideData = [
    {
      date: "2025.03.17",
      time: "15:56",
      status: "Completed",
      locations: [
        "Yu Boarding House, Queborac, Bagumbayan Sur, Naga City",
        "McDonald's Magsaysay, Magsaysay Avenue, Naga City",
      ],
      fare: "14.00",
    },
    {
      date: "2025.03.16",
      time: "12:30",
      status: "Completed",
      locations: [
        "SM City Naga, Central Terminal",
        "Universidad de Sta. Isabel, Elias Angeles St.",
      ],
      fare: "18.50",
    },
    {
      date: "2025.03.15",
      time: "08:45",
      status: "Completed",
      locations: [
        "Naga City People’s Mall, General Luna St.",
        "Ateneo de Naga University, Bagumbayan Norte",
      ],
      fare: "14.00",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.stitle}>
          <Text style={styles.text}>History</Text>
        </View>

        {rideData.map((ride, index) => (
        <RideHistoryCard
          key={index}
          date={ride.date}
          time={ride.time}
          status={ride.status}
          locations={ride.locations}
          fare={ride.fare}
        />
      ))}
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  stitle: {
    marginTop: 100,
    marginLeft: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});