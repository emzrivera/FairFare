import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ReportCard from './components/ReportCard'; 
import { COLORS, FONTS } from '../constants/theme';

export default function ReportScreen() {
  const reportData = [
    {
      reportId: '00192',
      status: 'Pending',
      plateNo: 'YD8337',
      location: 'Magsaysay Ave.',
      type: 'Overpricing',
      compliant: 'Analain Smith',
    },
    {
      reportId: '00193',
      status: 'Pending',
      plateNo: 'NAQ1234',
      location: 'Centro II',
      type: 'Reckless Driving',
      compliant: 'Juan Dela Cruz',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stitle}>
        <Text style={styles.text}>Reports</Text>
      </View>

      {reportData.map((report, index) => (
        <ReportCard
          key={index}
          reportId={report.reportId}
          status={report.status}
          plateNo={report.plateNo}
          location={report.location}
          type={report.type}
          compliant={report.compliant}
          onView={() => {
            // Navigate to detailed report screen if needed
            console.log('Viewing report', report.reportId);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 15,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  stitle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    padding: 20,
    fontSize: 32,
    fontFamily: FONTS.bold,
  },
});
