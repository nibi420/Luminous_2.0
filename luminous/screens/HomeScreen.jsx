import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // example library for icons
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import * as Progress from 'react-native-progress';
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IP } from "../constant.js";
import DonationProgressBar from "./DonationProgressBar";
import { useState, useEffect } from 'react';
import axios  from "axios";
import { IP } from "../constant.js";
import Loading from "../components/Loading";

export default function HomeScreen({ navigation }) {

  const[upcomingEvent, setUpcomingEvent] = useState([]);
  const [upcomingDonation, setUpcomingDonation] = useState([]);
  const [number, setNumber] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${IP}/getUpcomingEvent`);
        const response2 = await axios.get(`${IP}/getDonationsData`);
        setUpcomingDonation(response2.data);
        setUpcomingEvent(response.data);


      } catch (error) {
        console.log("Error In HomeScreen")
        console.error(error);

      }
    };
    fetchData()

    


    


    const backAction = () => {

      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;

    };

    

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [1]);


 

  const handleButtonPress = () => {
    Alert.prompt(
      'Enter a number',
      '',
      (text) => setNumber(parseInt(text)),
      'plain-text'
    );
  };


  console.log("HEHEHE",upcomingEvent);
  console.log("Donation:", upcomingDonation);

  if (upcomingEvent.length == 0) {


    return <Loading />

  }

  const handleEvent = async () => {
    navigation.navigate("events");
    console.log("Navigating to Event Screen");

    // console.log("Failed On Event Navigation");
    // console.log(error);
  };

  const handleProfile = () => {
    navigation.navigate("profile");
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/main_logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Luminous</Text>
          <Text style={styles.subtitle}>Home page</Text>
          <ScrollView style ={{width: '100%'}}>
            <Text style={styles.cardTitle}>Featured Welfare Post</Text>
            <TouchableOpacity
              style={[styles.card, { borderColor: '#000000', borderWidth: 2 }]}
              onPress={() => console.log("Clicked on Featured Welfare Post")}
            >
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1TflCyfWDMNu6q7hVfgolfdYix7qE377UQ&usqp=CAU' }}
                style={{ width: '100%', height: 100, borderRadius: 10 }}
              />
              <View style={{ paddingHorizontal: 10,}}>
                <Text style={{ fontWeight: 'bold', color: 'grey' }}>Welfare Committee</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{upcomingDonation[0].post_title}</Text>
                <Progress.Bar progress={30 / 100} color="skyblue" height={10} width={null} marginVertical={10} />
                <TouchableOpacity style={{ backgroundColor: '#000000', borderRadius: 15, padding: 10, marginTop: 10 }} onPress={handleButtonPress()}>
                  <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Pledge</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <Text style={styles.cardTitle}>Upcoming Event</Text>
            <TouchableOpacity
              style={[styles.card, { borderColor: '#000000', borderWidth: 2 }]}
              onPress={() => console.log("Clicked on Featured Image")}
            >
              <Image
                source={{ uri: 'https://ismailimail.files.wordpress.com/2018/09/1535934888385blob.png' }}
                style={{ width: '100%', height: 200, borderRadius: 10 }}
              />
              <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, }}>{upcomingEvent[0].title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ color: '#2E96D2' }}>{upcomingEvent[0].venue.name}</Text>
                  <Text style={{ color: 'white', marginHorizontal: 10 }}>|</Text>
                  <Text style={{ color: '#2E96D2' }}>{new Date(upcomingEvent[0].time).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
      </LinearGradient>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#093147",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    display: 'flex',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'white',
  },
  cardContent: {
    fontSize: 16,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#000",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#aaa",
  },
  selectedNavButton: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
  },
  selectedNavText: {
    color: "blue",
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
