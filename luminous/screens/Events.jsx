import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IP } from "../constant.js";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
];

// const banners = [
//   { id: 1, imageUrl: "https://assets.xboxservices.com/assets/ef/9e/ef9e8f9f-4141-409c-9bab-659102bcc6b2.jpg?n=XSX_Page-Hero-0_768x1434.jpg", title: "Event 1" },
//   {
//     id: 2,
//     imageUrl:
//       "https://lums.edu.pk/sites/default/files/styles/main_slider_1550_532/public/2020-08/OWeek.jpg",
//     title: "Event 2",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://m.media-amazon.com/images/M/MV5BODYxNDdhYjktMjU5ZS00ZGIxLTg1MDctYjQwNjA2MGRiZWI3XkEyXkFqcGdeQXVyMzc0NzU5MTc@._V1_.jpg",
//     title: "Event 3",
//   },
//   {
//     id: 4,
//     imageUrl:
//       "https://i.scdn.co/image/82aae68f2f1fbd91259d07f29c508236aa9e696d",
//     title: "Event 4",
//   },
// ];

export default function Event({ navigation }) {

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get(`${IP}/getAllEvents`)
      .then(response => {
        setBanners(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <View style={styles.topContainer}>
        <Text style={styles.eventsTitle}>Events</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <View key={category.id} style={styles.category}>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
      <ScrollView style={styles.bannersContainer}>
        {filteredBanners.map((banner) => (
          <TouchableOpacity
            style={styles.button}
            key={banner.id}
            // onPress={() => navigation.navigate(banner.title)}
            onPress={() => navigation.navigate('eventsDetails', banner)}
          >
            <View style={styles.banner}>
              <Image
                source={{ uri: banner.imageUrl }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerInfo}>
                <Text style={styles.bannerTitle}>{banner.title}</Text>
                <Text style={styles.bannerPostedBy}>
                  Posted by: {banner.postedBy.username}
                </Text>
                <Text style={styles.bannerVenue}>Venue: {banner.venue.name}</Text>
                <Text style={styles.bannerDate}>Date: {new Date(banner.time).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text style={styles.bannerTime}>
                  Time: {new Date(banner.time).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="map-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selectedNavButton]}>
          <Ionicons name="calendar-outline" size={24} color="blue" />
          <Text style={[styles.navText, styles.selectedNavText]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton]}>
          <Ionicons name="home-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  eventsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  searchContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    color: "white",
  },
  categoriesContainer: {
    marginTop: 20,
    marginLeft: 20,
    height: 50,
  },
  category: {
    backgroundColor: "rgba(255, 255, 255, 0.0)", // 80% opaque white
    marginRight: 15,
    // paddingVertical: 0,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  categoryName: {
    fontSize: 11,
    padding: 4,
    color: "white",
  },
  bannersContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  banner: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bannerImage: {
    width: 150,
    height: "100%",
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bannerInfo: {
    marginLeft: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },
  bannerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bannerPostedBy: {
    color: "white",
    fontSize: 14,
  },
  bannerVenue: {
    color: "white",
    fontSize: 14,
  },
  bannerDate: {
    color: "white",
    fontSize: 14,
  },
  bannerTime: {
    color: "white",
    fontSize: 14,
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
});
