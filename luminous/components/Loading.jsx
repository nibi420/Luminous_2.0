import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator animating={true} size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default Loading;
