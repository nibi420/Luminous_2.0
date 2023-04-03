import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useState } from "react";

export default function Profile({ navigation }) {
  const [avatar, setAvatar] = useState("");

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <Avatar.Image source={{ uri: avatar ? avatar : null }} size={100} />
      <Text style={{ color: "white" }}>Profile</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // height: "100%",
    alignItems: "center",
    paddingTop: 80,
  },
});
