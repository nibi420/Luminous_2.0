import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const [avatar, setAvatar] = useState("");

  const tempProfilePic = "../assets/profile.png";

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
        <Header name="Profile" />
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: 2,
            marginBottom: 20,
          }}
        ></View>
        <Avatar.Image
          source={require(tempProfilePic)}
          size={150}
          style={{ backgroundColor: "white" }}
          resizeMode="cover"
        />
        <Text style={{ color: "white", fontSize: 30 }}>Name</Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          Username
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: 1,
            // marginVertical: 20,
          }}
        ></View>

        <ScrollView
          style={{
            // alignSelf: "flex-start",
            flex: 1,
            marginVertical: 10,
            marginHorizontal: 40,
            width: "85%",
          }}
        >
          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="person"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Change Username</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="lock"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="notifications"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="help"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Help</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="info"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>About</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="power-settings-new"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>
        </ScrollView>
      </LinearGradient>
      <Navbar navigation={navigation} currentScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: -30,
    marginBottom: -15,
    marginRight: -15,
  },

  header: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },

  option: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
  },

  optionsText: {
    color: "white",
    fontSize: 18,
  },

  border: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    opacity: 0.5,
  },
});
