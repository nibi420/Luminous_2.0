import { IP } from "../constant.js";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";




  

 

const TestingScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Testing Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("homescreen")}
      >
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("events")}
      >
        <Text style={styles.text}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("verify")}
      >
        <Text style={styles.text}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        
        onPress={() => navigation.navigate("donations")}
      >
        <Text style={styles.text}>Donation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  header: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TestingScreen;
