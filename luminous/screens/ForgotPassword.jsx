import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleNext = async () => {
    try {
      if (email == "") {
        ToastAndroid.show("Please Enter Email Address", ToastAndroid.LONG);
        return;
      }

      const response = await axios.post(`${IP}/forgotPassword`, { email });

      if (!response.data.success) {
        ToastAndroid.show(response.data.message, ToastAndroid.LONG);
        return;
      }

      navigation.navigate("resetPassword", { email });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
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
          Forgot Password
        </Text>
      </View>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputText}>Enter Email Address</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Email Address"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.btntext}>Next</Text>
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
    // borderColor: "rgba(0,0,255,0.5)",
    // borderWidth: 2,
    // borderRadius: 10,
    // backgroundColor: "rgba(0,0,255,0.1)",
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
export default ForgotPassword;
