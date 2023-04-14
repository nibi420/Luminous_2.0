// import React from "react";
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
import DonationProgressBar from "./DonationProgressBar";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";



const { width } = Dimensions.get("window");

// const categories = [
//   { id: 1, name: "Category 1" },
//   { id: 2, name: "Category 2" },
//   { id: 3, name: "Category 3" },
//   { id: 4, name: "Category 4" },
//   { id: 5, name: "Category 5" },
// ];

// const banners = [
//   { id: 1, imageUrl: "https://thumbs.dreamstime.com/z/donate-money-vector-illustration-charity-donation-concept-hand-putting-banknote-box-eps-143816912.jpg", title: "Donation 1" },
//   {
//     id: 2,
//     imageUrl:
//       "https://ofhsoupkitchen.org/wp-content/uploads/2022/07/donation-vs.-contribution.jpg",
//     title: "Donation 2",
//   },
// ];






import { IP } from '../constant';
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const Donation = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [catQuery, setCatQuery] = useState("");
  const [request,setRequest] = useState({categories:null,data:null})
  const [myswitch, setSwitch] = useState(1);
  const userRole = useSelector((state) => state.profile.role)
  const isVisible = userRole === "stuco" ? true: false
  console.log(userRole)
  // const isVisible = true;
  // const [loading,setloadin]
  // const [x, setx] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${IP}/getDonationsData`);
        // setData(response.data);
        const catresponse = await axios.post(`${IP}/getDonationCategories`,{type:"donations"});
        catresponse.data.unshift({name:"All"})
        // console.log(catresponse.data)
        // Array.unshift(element);

        setRequest({categories: catresponse.data,data: response.data});
        

      } catch (error) {
        console.log("dsjflsdhfajsdhfaskd")
        console.error(error);

      }
    };

    fetchData()
  }, [1]);

  

  if (!request.data  ) {

    // return <Text>Loading...</Text>;
    return<Loading/>
  }
  
  const filteredData = request.data.filter((banner) =>{
 
    if(myswitch === 1){
      return banner.post_title.toLowerCase().includes(searchQuery.toLowerCase());

    }
    if(myswitch === 2){
      if(catQuery == "All"){
        return banner.post_title.toLowerCase().includes("");

      }
      return banner.category.toLowerCase().includes(catQuery.toLowerCase())

    }
  }
    
  );


  return (
    <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
      <View style={styles.topContainer}>
        <Text style={styles.eventsTitle}>Donations</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search"
          onChangeText={(query) => {
            setSwitch(1);
            setSearchQuery(query)}}
          value={searchQuery} />
      </View>


      {isVisible && (<View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: "#2482C7" }]}
          // onPress={handleLogin}
        >
            <Ionicons name="add" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{color:"white"}}>Add donations</Text>
        </TouchableOpacity>
      </View>)}





      {/* <TouchableOpacity  style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="add" size={24} color="white" style={{ marginRight: 8 }} />
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add Donations</Text> */}
    {/* </TouchableOpacity> */}
      <View style={styles.catContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {request.categories.map((category) => (
             <TouchableOpacity
             
             onPress={() => {
              setSwitch(2);
              setCatQuery(category.name)}}
           >
            <View key={category.id} style={styles.category}>
              <Text style={styles.categoryName}>{category.name}</Text>
             
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.bannersContainer}>
        {filteredData.map((banner) => (
          
          <TouchableOpacity
            style={styles.button}
            key={banner._id}
            onPress={() => navigation.navigate('donationsDetails', banner)}
          >
            <View style={styles.banner}>
              <Image
                source={{ uri: banner.image }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerInfo}>
                <Text style={styles.bannerTitle}>{banner.post_title}</Text>
                <Text style={{color:"grey"}}>Posted by: Welfare Committee</Text>

                {banner.required !== 0? (
          <DonationProgressBar collected={banner.collected / banner.required} pledged={100} total={banner.required} />
        ) : <DonationProgressBar collected={banner.collected /0.1} pledged={100} total={banner.required} /> }
        
                


                {/* <DonationProgressBar collected={banner.collected / req} pledged={100} total={req} /> */}

              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    flexDirection:"row",
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
  searchInput: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    color: "white",
  },
  categoriesContainer: {
    // position: "absolute",
    // flex: 1,
    marginTop: 20,
    // marginLeft: 20,
    height: "80%",
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

export default Donation;
