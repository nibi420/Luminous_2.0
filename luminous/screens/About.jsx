import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { IP } from "../constant.js";

const About = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleSubmit = async () => {
    console.log("Submit");
    try {
      if (oldPassword == "" || newPassword == "" || confirmPassword == "") {
        ToastAndroid.show("Please Fill in All Fields", ToastAndroid.LONG);
        return;
      }

      if (newPassword != confirmPassword) {
        ToastAndroid.show(
          "New Password and Confirm Password do not match ",
          ToastAndroid.LONG
        );
        return;
      }

      const response = await axios.post(`${IP}/changePassword`, {
        oldPassword,
        newPassword,
      });

      navigation.goBack();
      ToastAndroid.show("Password Changed Successfully", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Incorrect Old Password", ToastAndroid.LONG);
      console.log("Error", error);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            // borderColor: "white",
            // borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            // style={{ borderColor: "white", borderWidth: 1, padding: 15 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            // borderWidth: 1,
            // borderColor: "white",
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            marginRight: "5%",
            justifyContent: "center",
          }}
        >
          About
        </Text>
      </View>
      <ScrollView style={styles.inputContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/main_logo.png")}
        />

        <Text
          style={{ color: "white", lineHeight: 25, padding: 10, fontSize: 15 }}
        >
          Welcome to LUMINOUS, the companion app contextualized to LUMS!{"\n"}
          {"\n"}
          LUMINOUS is a mobile application designed to facilitate ease in campus
          life, increase event accessibility and turnover, and garner a greater
          audience for donations.{"\n"}
          {"\n"}With an interactive map, an event tracker, and a donation
          system, LUMINOUS serves as a one-stop shop for all things LUMS. We aim
          to provide students, staff, faculty, and visitors with an intuitive
          platform that streamlines the LUMS experience.{"\n"}
          {"\n"}With the app, you can easily navigate campus using our
          interactive map, stay updated on upcoming events with our event
          tracker, and make donations to support various causes at LUMS through
          our donation system.{"\n"}
          {"\n"}LUMINOUS is constantly evolving to meet the changing needs of
          the LUMS community. We welcome your feedback and suggestions to help
          us improve and enhance the app. Thank you for choosing LUMINOUS as
          your go-to LUMS companion app!
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    marginVertical: -60,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    // backgroundColor: "rgba(0,0,50,0.2)",
    borderColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },

  inputContainer: {
    flex: 1,
    width: "90%",
    margin: 10,
    marginBottom: 20,
    // borderColor: "rgba(0,0,255,0.5)",
    // borderWidth: 2,
    // borderRadius: 10,
    // color: "white",
    // lineHeight: 20,
    // justifyContent: "center",
  },
});

export default About;
