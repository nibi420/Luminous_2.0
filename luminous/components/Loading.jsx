import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Loading = () => {
  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={["#000000", "#0E2C4F"]}
    >
      <ActivityIndicator animating={true} size="100" color="blue" />
    </LinearGradient>
  );
};

export default Loading;
