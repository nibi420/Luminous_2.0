import React, { useState } from "react";
import axios from "axios";
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
import { IP } from "../constant.js";
import { useDispatch } from "react-redux";

export default function App({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setemail(email.trim());
      const response = await axios.post(`${IP}/login`, {
        email,
        password,
      });

      if (!response.data.success) {
        // I think here we need to use response.data.success
        console.log("Error", response.data.message);
        Alert.alert("Error!", "Incorrect Email or Password");
        return;
      }

      dispatch({
        type: "loginSuccess",
        payload: response.data.user,
      });
      dispatch({ type: "changeScreen", payload: "home" });

      // console.log("Data = ", response.data);
      navigation.navigate("homescreen");
    } catch (error) {
      dispatch({
        type: "loginFailure",
      });

      Alert.alert("Error!", "Incorrect Email or Password");
      console.log("Error", error);
    }
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    navigation.navigate("signup");
  };

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
      <Text style={styles.loginTitle}>Login</Text>

      <View
        style={[styles.inputView, { borderColor: "#2482C7", borderWidth: 2 }]}
      >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setemail(text)}
          value={email}
        />
      </View>

      <View
        style={[styles.inputView, { borderColor: "#2482C7", borderWidth: 2 }]}
      >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: "#2482C7" }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.registerBtn,
            { borderColor: "#2482C7", borderWidth: 2 },
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signupText}>
        Forgot Password?{" "}
        <Text
          style={{ color: "#2482C7" }}
          onPress={() => navigation.navigate("forgotpassword")}
        >
          Reset Password
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 300,
    marginBottom: 40,
    marginTop: -90,
  },
  inputView: {
    width: "90%",
    backgroundColor: "black",
    borderRadius: 25,
    height: 50,
    marginBottom: 35,
    justifyContent: "center",
    padding: 30,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    width: "40%",
  },
  loginText: {
    color: "white",
  },
  registerBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 10,
    width: "40%",
  },
  registerText: {
    color: "white",
  },
  signupText: {
    color: "white",
    marginTop: 15,
  },

  loginTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
    marginTop: -40,
    marginBottom: 50,
    justifyContent: "center",
    textAlign: "center",
  },
});
