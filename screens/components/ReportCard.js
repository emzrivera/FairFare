import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';

export default function ReportCard({ reportId, status, plateNo, location, type, compliant, onView }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="clock-o" size={14} color="#aaa" />
        <Text style={styles.reportId}>Report #{reportId}</Text>
        <Text style={[styles.status, status === 'Pending' && { color: 'green' }]}>{status}</Text>
      </View>

      <View style={styles.divider} />

      {/* Plate No. */}
      <View style={styles.plateRow}>
        <View style={styles.dot} />
        <Text style={styles.plateText}>Plate No. {plateNo}</Text>
      </View>

      {/* Report Details */}
      <View style={styles.detailRow}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{location}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Complain Type</Text>
        <Text style={styles.value}>{type}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Compliant</Text>
        <Text style={styles.value}>{compliant}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.assigned}>Assigned</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={onView}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderColor: "#eee",
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportId: {
    marginLeft: 5,
    flex: 1,
    fontSize: 14,
    color: "#444",
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 8,
  },
  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.orange,
    borderRadius: 4,
    marginRight: 8,
  },
  plateText: {
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: '#666',
    fontSize: 13,
  },
  value: {
    fontWeight: '600',
    fontSize: 13,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  assigned: {
    color: '#aaa',
    fontSize: 12,
  },
  viewBtn: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewText: {
    color: '#fff',
    fontWeight: '600',
  },
});
