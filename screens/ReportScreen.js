import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native";


export default function ReportScreen() {
  const [issueType, setIssueType] = useState(""); 
  const pickerRef = useRef(); 
  
  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Image source={require('../assets/Report-icon.png')} style={styles.headerImage} />
          <Text style={styles.title}>Report Fare Issue</Text>
        </View>

        <Text style={styles.subtitle}>
          Provide accurate details and evidence to ensure fair fare reviews. False reports may affect system credibility.
        </Text>

        <Text style={styles.requiredNote}>* Indicates a required field</Text>

  
        <TextInput style={styles.input} placeholder="Email Address *" keyboardType="email-address" />

        {/* Mobile Input */}
        <TextInput style={styles.input} placeholder="Mobile Number *" keyboardType="phone-pad" />

        {/* Tricycle Details */}
        <Text style={styles.sectionTitle}>Tricycle Details</Text>
        <TextInput style={styles.input} placeholder="Tricycle Number *" />
        <TextInput style={styles.input} placeholder="Tricycle Driver" />

        {/* Issue Type Dropdown */}
        <Text style={styles.sectionTitle}>Issue Type</Text>
          
          <View >
            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => pickerRef.current?.togglePicker()}
            >
              <Text style={{ color: issueType ? "#332000" : "#A9A9A9" }}>
                {issueType ? issueType.replace("_", " ").toUpperCase() : "Select Issue Type..."}
              </Text>
              <FontAwesome name="chevron-down" size={16} color="#332000" />
            </TouchableOpacity>

            <RNPickerSelect
              onValueChange={(value) => setIssueType(value)}
                items={[
                  { label: "Overcharged Fare", value: "overcharged" },
                  { label: "Incorrect Fare", value: "incorrect_fare" },
                  { label: "Rude Behavior", value: "rude_behavior" },
                  { label: "Vehicle Issues", value: "vehicle_issues" },
                  { label: "Refused to Provide Change", value: "no_change" },
                  { label: "Other", value: "other" },
                ]}
                  placeholder={{ label: "Select Issue Type...", value: "" }} 
                  value={issueType}
                  useNativeAndroidPickerStyle={false}
                  style={{
                  inputIOS: { display: "none" }, 
                  inputAndroid: { display: "none" },  
                }}
                ref={pickerRef}
            />
        </View>
        {/* Problem Description */}
        <TextInput style={[styles.input, styles.textArea]} placeholder="Please describe the problem in detail..." multiline />

        {/* Upload Evidence */}
        <Text style={styles.sectionTitle}>Upload Evidence</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <FontAwesome name="upload" size={16} color="#FDC800" />
          <Text style={styles.uploadText}>Upload File</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 70,
    
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#332000",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  requiredNote: {
    fontSize: 12,
    color: "red",
    marginBottom: 15,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#332000",
    marginTop: 15,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 10,
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    flexDirection: "row",  
    alignItems: "center",  
    justifyContent: "space-between",  
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical:5, 
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6D6",
    borderWidth: 1,
    borderColor: "#FDC800",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  uploadText: {
    color: "#FDC800",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: "#332000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// const pickerSelectStyles = {
//   inputIOS: {
//     fontSize: 16,
//     paddingHorizontal: 10,
  
  
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//   },
// };
