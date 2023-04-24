import React from "react";
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
import Navbar from "../components/Navbar.jsx";
import Loading from "../components/Loading.jsx";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
];



export default function Event({ route, navigation }) {

  // const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [catQuery, setCatQuery] = useState("");
  const [request, setRequest] = useState({ categories: null, data: null })
  const [myswitch, setSwitch] = useState(1);

  const userRole = useSelector((state) => state.profile.role)
  const isVisible = userRole === "admin" || userRole === 'stuco' ? true : false

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (route.params?.refresh) {
      // handle the refresh here
      console.log('Refreshing...');
      setRefreshing(true);
    }
  }, [route.params?.refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${IP}/getAllEvents`);
        // setData(response.data);


        const catresponse = await axios.post(`${IP}/getDonationCategories`, { type: "events" });
        catresponse.data.unshift({ name: "All" })
        // console.log(catresponse.data)
        // Array.unshift(element);

        setRequest({ categories: catresponse.data, data: response.data });


      } catch (error) {
        console.log("dsjflsdhfajsdhfaskd")
        console.error(error);

      }
    };
    fetchData()
  }, [1]);

  // useEffect(() => {
  //   axios.get(`${IP}/getAllEvents`)
  //     .then(response => {
  //       setBanners(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  if (!request.data) {


    return <Loading />

  }

  const filteredBanners = request.data.filter((banner) => {
    console.log(banner)

    if (myswitch === 1) {
      return banner.title.toLowerCase().includes(searchQuery.toLowerCase());

    }
    if (myswitch === 2) {
      if (catQuery == "All") {
        return banner.title.toLowerCase().includes("");

      }
      else {
        try {
          let a = banner.category.toLowerCase().includes(catQuery.toLowerCase())
          return a;
        }
        catch (error) {
          console.log(error)
          // return "Nothing found in this category"
        }
      }

    }
  })

  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <Header name="Events" />
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          height: 2,
          marginBottom: 0,
          alignSelf: "center",
        }}
      ></View>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="rgba(255, 255, 255, 0.4)" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
          onChangeText={(query) => {
            setSwitch(1);
            setSearchQuery(query)
          }}
          value={searchQuery} />
      </View>

      {isVisible && (<View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: "#2482C7" }]}
          onPress={() => navigation.navigate('addevent')}
        >
          <Ionicons name="add" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: "white" }}>Add Events</Text>
        </TouchableOpacity>
      </View>)}

      <View style={styles.catContainer}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {request.categories.map((category, index) => (
            <TouchableOpacity
              key={index}

              onPress={() => {
                setSwitch(2);
                setCatQuery(category.name)
              }}
            >
              <View key={category.id} style={styles.category}>
                <Text style={styles.categoryName}>{category.name}</Text>

              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.bannersContainer}>
        {filteredBanners.map((banner, index) => (
          <TouchableOpacity
            style={styles.button}
            key={index}
            // onPress={() => navigation.navigate(banner.title)}
            onPress={() => navigation.navigate('eventsDetails', banner)}
          >
            <View style={styles.banner}>
              <Image
                source={{ uri: banner.picture.url }}
                style={styles.bannerImage}
              />
              <LinearGradient start={{ x: 0, y: 1 }}
                end={{ x: 0.8, y: 0 }} style={styles.bannerInfo} colors={["rgba(0, 0, 0, 0.7)", "rgba(36, 130, 199, 0.7)"]}>
                <View>

                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerPostedBy}>
                    Posted by: {banner.postedBy.username}
                  </Text>

                  <View style={styles.bannerSmallInfo}>

                    <Text style={styles.bannerVenue}>Venue: <Text style={styles.smallDetails}>{banner.venue.name}</Text></Text>
                    <Text style={styles.bannerDate}>Date: <Text style={styles.smallDetails}>{new Date(banner.time).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Text></Text>
                    <Text style={styles.bannerTime}>
                      Time: <Text style={styles.smallDetails}>{new Date(banner.time).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}</Text>
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <View style={styles.navBar}>
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
        </TouchableOpacity> */}
      {/* </View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    // marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "transparent",
    borderRadius: 20,

    // paddingHorizontal: 20,
    // paddingVertical: 10,
    flexDirection: "row",
    // alignItems: "center",
  },
  addBtn: {
    flexDirection: "row",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
    width: "90%",
  },
  container: {
    flex: 1,
    paddingTop: 50,
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
    marginBottom: 5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
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
    // position:"absolute",
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    // height: 50,
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
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bannerInfo: {
    marginLeft: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,

  },
  bannerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bannerPostedBy: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bannerVenue: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerDate: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerTime: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontWeight: "bold",
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
  bannerSmallInfo: {
    backgroundColor: "rgba(35, 62, 105, 0.5)",
    borderRadius: 6,
    padding: 5,
  },
  smallDetails: {

    color: "white",
    fontSize: 14,
  },
});