import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"; 

export default function RideHistoryCard({ date, time, status, locations, fare }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome name="clock-o" size={16} color="#aaa" />
        <Text style={styles.dateTime}>{date} {time}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <View style={styles.routeContainer}>
        {locations.map((location, index) => (
          <View key={index} style={styles.locationRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
              {location}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.fareLabel}>Total Fare:</Text>
        <Text style={styles.fare}>₱ {fare}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTime: {
    marginLeft: 5,
    fontSize: 14,
    color: "#777",
    flex: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "green",
  },
  routeContainer: {
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    overflow: "hidden",
  },
  bullet: {
    fontSize: 14,
    color: "orange",
    marginRight: 5,
  },
  location: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    flexShrink: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },
  fareLabel: {
    fontSize: 14,
    color: "#aaa",
  },
  fare: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});