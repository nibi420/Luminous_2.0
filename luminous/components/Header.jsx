import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={{ color: "white", fontSize: 30 }}>{props.name}</Text>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
