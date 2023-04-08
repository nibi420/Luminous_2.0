import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Navbar = ({ navigation, currentScreen }) => {
  const handleEvent = async () => {
    console.log("Navigating to Event Screen");
    navigation.navigate("events");
  };

  const handleProfile = () => {
    console.log("Navigating to Profile Screen");
    navigation.navigate("profile");
  };

  const handleHome = () => {
    console.log("Navigating to Home Screen");
    navigation.navigate("homescreen");
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={
          currentScreen === "map"
            ? [styles.navButton, styles.selectedNavButton]
            : styles.navButton
        }
      >
        <Ionicons
          name="map-outline"
          size={24}
          color={currentScreen === "map" ? "blue" : "#aaa"}
        />
        <Text
          style={
            currentScreen === "map"
              ? [styles.navText, styles.selectedNavText]
              : styles.navText
          }
        >
          Map
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "events"
            ? [styles.navButton, styles.selectedNavButton]
            : styles.navButton
        }
        onPress={handleEvent}
      >
        <Ionicons
          name="calendar-outline"
          size={24}
          color={currentScreen === "events" ? "blue" : "#aaa"}
        />
        <Text
          style={
            currentScreen === "events"
              ? [styles.navText, styles.selectedNavText]
              : styles.navText
          }
        >
          Events
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "home"
            ? [styles.navButton, styles.selectedNavButton]
            : styles.navButton
        }
        onPress={handleHome}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={currentScreen === "home" ? "blue" : "#aaa"}
        />
        <Text
          style={
            currentScreen === "home"
              ? [styles.navText, styles.selectedNavText]
              : styles.navText
          }
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "donate"
            ? [styles.navButton, styles.selectedNavButton]
            : styles.navButton
        }
      >
        <Ionicons
          name="heart-outline"
          size={24}
          color={currentScreen === "donate" ? "blue" : "#aaa"}
        />
        <Text
          style={
            currentScreen === "donate"
              ? [styles.navText, styles.selectedNavText]
              : styles.navText
          }
        >
          Donate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentScreen === "profile"
            ? [styles.navButton, styles.selectedNavButton]
            : styles.navButton
        }
        onPress={handleProfile}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={currentScreen === "profile" ? "blue" : "#aaa"}
        />
        <Text
          style={
            currentScreen === "profile"
              ? [styles.navText, styles.selectedNavText]
              : styles.navText
          }
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Navbar;
