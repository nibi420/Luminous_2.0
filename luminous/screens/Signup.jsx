import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { IP } from "../constant.js";

export default function Signup({ navigation }) {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const validateEmail = () => {
    const regex = /^[^\s@]+@([^\s@]+\.)?lums\.edu\.pk$/;
    return regex.test(email);
  };

  const passwordCheck = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignUp = async () => {
    if (
      fullname === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      Alert.alert("Error!", "Please fill in all fields");
      return;
    }

    if (!validateEmail()) {
      Alert.alert("Error!", "Please enter a valid LUMS email ID");
      return;
    }

    if (!passwordCheck()) {
      Alert.alert("Error!", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${IP}/register`, {
        fullname,
        email,
        password,
        username,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("verify");
    console.log(fullname, email, password, confirmPassword, username);
  };

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
      <Text style={styles.signUpTitle}>Sign up</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Full Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setfullname(text)}
          value={fullname}
        />
      </View>
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.signupText}>
          Already have an account?{" "}
          <Text style={{ color: "#2482C7" }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 400,
    height: 300,
    // marginBottom: 4,
    marginTop: -10,
  },
  inputView: {
    width: "85%",
    backgroundColor: "black",
    borderColor: "#2482C7", // Add matching border color
    borderWidth: 2, // Add border width
    borderRadius: 25,
    height: 50,
    // marginTop: -10,
    marginBottom: 15,
    justifyContent: "center",
    padding: 27, // Decrease padding
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#2482C7",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 15, // Increase font size
  },
  signupText: {
    color: "white",
    // marginTop: 15,
  },
  signUpTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
    marginTop: -65,
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
  },
});
