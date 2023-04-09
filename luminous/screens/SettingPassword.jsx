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
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { IP } from "../constant.js";

const SettingPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    console.log("Submit");
    try {
      if (newPassword == "" || confirmPassword == "") {
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

      const response = await axios.put(`${IP}/settingPassword`, {
        newPassword,
      });

      navigation.navigate("login");

      await axios.get(`${IP}/logout`);
      ToastAndroid.show("Password Changed Successfully", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Uh-oh! Something went wrong :(", ToastAndroid.LONG);
      console.log("Error", error);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <View style={styles.header}>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
          Reset Password
        </Text>
      </View>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputText}>Enter New Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="New Password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.input}
            onChangeText={(text) => {
              setNewPassword(text);
            }}
            value={newPassword}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputText}>Confirm New Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.input}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btntext}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    marginVertical: -70,
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
    width: "90%",
    padding: 20,
    borderColor: "rgba(0,0,255,0.5)",
    borderWidth: 2,
    borderRadius: 10,
    // justifyContent: "center",
  },

  inputText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
  },

  input: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: "100%",
    padding: 10,
  },

  // btn: {
  //   margin: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "50%",
  //   height: 50,
  //   backgroundColor: "rgba(0,0,255,0.5)",
  //   borderRadius: 10,
  // },

  btn: {
    margin: 20,
    width: 200,
    backgroundColor: "#2E96D2",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },

  btntext: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingPassword;
