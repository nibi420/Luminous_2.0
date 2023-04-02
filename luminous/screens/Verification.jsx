import { IP } from "../constant.js";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function App({ navigation, route }) {
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [otp, setOtp] = useState("");

  const handleInput1Change = (value) => {
    setInput1(value);
    if (value.length === 1) {
      input2Ref.current.focus();
    }
  };

  const handleInput2Change = (value) => {
    setInput2(value);
    if (value.length === 1) {
      input3Ref.current.focus();
    }
  };

  const handleInput3Change = (value) => {
    setInput3(value);
    if (value.length === 1) {
      input4Ref.current.focus();
    }
  };

  const handleInput4Change = (value) => {
    setInput4(value);
  };

  const handleSubmit = async () => {
    try {
      const code = input1 + input2 + input3 + input4;
      if (code.length < 4) {
        Alert.alert(
          "Not Enough Digits",
          "Whoopsies.\nLooks like you are missing some digits there bud."
        );
        return;
      } else if (code.includes(".")) {
        Alert.alert("Incorrect Character", "Please enter numbers only");
        return;
      }

      setOtp(Number(code));
      console.log("OTP", otp);

      const response = await axios.post(`${IP}/verify`, { otp });

      if (!response.data.success) {
        console.log("Error", response.data.message);
        Alert.alert("Error!", "Incorrect OTP or it has expired.");
        return;
      }

      navigation.navigate("login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const timer = 10;
  const [isEnabled, setIsEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsEnabled(true);
    }
  }, [timeLeft]);

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <Image style={styles.logo} source={require("../assets/main_logo.png")} />
      <View>
        <Text style={styles.text}>
          Enter the 4-digit code sent to your email
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectTextOnFocus={true}
            keyboardType="number-pad"
            maxLength={1}
            // caretHidden={true}
            style={styles.input}
            onChangeText={handleInput1Change}
            value={input1}
          ></TextInput>
          <TextInput
            ref={input2Ref}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectTextOnFocus={true}
            keyboardType="number-pad"
            maxLength={1}
            // caretHidden={true}
            style={styles.input}
            onChangeText={handleInput2Change}
            value={input2}
          ></TextInput>
          <TextInput
            ref={input3Ref}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectTextOnFocus={true}
            keyboardType="number-pad"
            maxLength={1}
            // caretHidden={true}
            style={styles.input}
            onChangeText={handleInput3Change}
            value={input3}
          ></TextInput>
          <TextInput
            ref={input4Ref}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectTextOnFocus={true}
            keyboardType="number-pad"
            maxLength={1}
            // caretHidden={true}
            style={styles.input}
            onChangeText={handleInput4Change}
            value={input4}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={isEnabled ? styles.enabledbtn : styles.resendbtn}
          disabled={!isEnabled}
          onPress={() => {
            setTimeLeft(timer);
            setIsEnabled(false);
          }}
        >
          <Text style={isEnabled ? styles.enabledtxt : styles.resendtxt}>
            Resend {!isEnabled ? timeLeft + `s` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    alignItems: "center",
  },

  logo: {
    width: 400,
    height: 300,
    marginBottom: -40,
    // paddingBottom: 30,
  },

  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: -10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },

  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  input: {
    color: "white",
    height: 75,
    width: 75,
    borderWidth: 2,
    borderColor: "#33A5E7",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 50,
  },

  btn: {
    margin: "auto",
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

  resendbtn: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    alignSelf: "center",
    width: 130,
    height: 30,
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7,
  },

  enabledbtn: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    alignSelf: "center",
    width: 130,
    height: 30,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    backgroundColor: "white",
  },

  resendtxt: {
    color: "white",
    textAlign: "center",
  },

  enabledtxt: {
    color: "black",
    textAlign: "center",
  },
});
