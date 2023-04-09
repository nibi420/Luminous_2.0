import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Verify from "./screens/Verification";
import HomeScreen from "./screens/HomeScreen";
import Events from "./screens/Events";
import TestingScreen from "./screens/TestingScreen";
import Profile from "./screens/Profile";
import ChangePassword from "./screens/ChangePassword";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import SettingPassword from "./screens/SettingPassword";
import axios from "axios";
import { IP } from "./constant.js";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${IP}/getProfile`);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      }
    };

    setLoading(true);
    console.log(isAuthenticated);
    fetchData();
    console.log(isAuthenticated);
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "home" : "login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="resetpassword" component={ResetPassword} />
        <Stack.Screen name="settingpassword" component={SettingPassword} />
        <Stack.Screen name="testing" component={TestingScreen} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="verify" component={Verify} />
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="events" component={Events} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
      </Stack.Navigator>

      {isAuthenticated && <Navbar />}
    </NavigationContainer>
  );
};

export default Main;
