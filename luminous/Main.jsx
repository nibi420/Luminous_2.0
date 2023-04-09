import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Verify from "./screens/Verification";
import HomeScreen from "./screens/HomeScreen";
import Events from "./screens/Events";
import Donation from "./screens/Donations";
import CreateDonation from "./screens/CreateDonation";
import TestingScreen from "./screens/TestingScreen";
import GradientScreen from "./screens/DonationsDetails";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="testing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="testing" component={TestingScreen} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="verify" component={Verify} />
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="events" component={Events} />
        <Stack.Screen name="donations" component={Donation} />
        <Stack.Screen name="donationDetails" component={CreateDonation} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
