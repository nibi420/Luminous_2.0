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
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Main = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${IP}/getProfile`);
        console.log(response.data);
        dispatch({
          type: "loadUserSuccess",
          payload: response.data,
        });
        dispatch({
          type: "changeProfile",
          payload: response.data.user,
        });
        setLoading(false);
      } catch (error) {
        dispatch({
          type: "loadUserFailure",
          payload: error.response.data.message,
        });
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "homescreen" : "login"}
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
