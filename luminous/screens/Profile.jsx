import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
// import {  } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { IP } from "../constant.js";
import Loading from "../components/Loading";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useDispatch } from "react-redux";

export default function Profile({ navigation }) {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${IP}/getProfile`);
        setAvatar(response.data.user.profile_picture.url);
        setName(response.data.user.fullname);
        setUsername(response.data.user.username);
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const handleUpload = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert("You need to enable permission in order to set profile picture");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      setAvatar(result.uri);

      const formData = new FormData();
      formData.append("avatar", {
        uri: result.uri,
        type: mime.getType(result.uri),
        name: result.uri.split("/").pop(),
      });

      console.log("Avatar", avatar);
      console.log("Form", formData);

      const response = await axios.put(`${IP}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Error idher hai:", error);
    }
  };

  const handleChangePassword = () => {
    navigation.navigate("changePassword");
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out");
      Alert.alert("Logging Out!", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            setLoading(true);
            await axios
              .get(`${IP}/logout`)
              .then(() => {
                dispatch({ type: "logoutSuccess" });
                dispatch({ type: "destroyProfile" });
                dispatch({ type: "changeScreen", payload: "" });
                setLoading(false);
                console.log("Logging out successfully");
                navigation.navigate("login");
              })
              .catch((error) => {
                dispatch({ type: "logoutFailure" });
                setLoading(false);
                Alert.alert("Uh-Oh", "We weren't able to log you out :(");
                console.log("Error:", error);
              });
          },
        },
      ]);
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
    }
  };

  const tempProfilePic = "../assets/profile.png";

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
        <Header name="Profile" />
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: 2,
            marginBottom: 20,
          }}
        ></View>
        <Avatar.Image
          source={avatar === "" ? require(tempProfilePic) : { uri: avatar }}
          size={110}
          style={{ backgroundColor: "white" }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleUpload}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="edit" size={20} color="white" />
          <Text style={{ color: "white", fontSize: 15, marginVertical: 10 }}>
            Change Picture
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 30 }}>{name}</Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          {username}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: 1,
            // marginVertical: 20,
          }}
        ></View>

        <ScrollView
          style={{
            // alignSelf: "flex-start",
            flex: 1,
            marginVertical: 10,
            marginHorizontal: 40,
            width: "85%",
          }}
        >
          <TouchableOpacity
            style={styles.option}
            onPress={handleChangePassword}
          >
            <MaterialIcons
              name="lock"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="notifications"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="help"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Help</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons
              name="info"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>About</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>

          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <MaterialIcons
              name="power-settings-new"
              size={24}
              color="white"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.optionsText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>
        </ScrollView>
      </LinearGradient>
      <Navbar navigation={navigation} currentScreen="profile" />
      {isloading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

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

  option: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
  },

  optionsText: {
    color: "white",
    fontSize: 18,
  },

  border: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    opacity: 0.5,
  },
});
