import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // example library for icons
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IP } from "../constant.js";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleEvent = async () => {
    navigation.navigate("events");
    console.log("Navigating to Event Screen");

    // console.log("Failed On Event Navigation");
    // console.log(error);
  };

  const handleProfile = () => {
    navigation.navigate("profile");
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/main_logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Luminous</Text>
          <Text style={styles.subtitle}>Home page</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log("Clicked on Featured Welfare Post")}
          >
            <Text style={styles.cardTitle}>Featured Welfare Post</Text>
            <Text style={styles.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              gravida turpis.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log("Clicked on Upcoming Event")}
          >
            <Text style={styles.cardTitle}>Upcoming Event</Text>
            <Text style={styles.cardContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              gravida turpis.
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="map-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleEvent}>
          <Ionicons name="calendar-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selectedNavButton]}>
          <Ionicons name="home-outline" size={24} color="blue" />
          <Text style={[styles.navText, styles.selectedNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleProfile}>
          <Ionicons name="person-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#000",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#aaa",
  },
  selectedNavButton: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
  },
  selectedNavText: {
    color: "blue",
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
