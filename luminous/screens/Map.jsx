import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity,Image } from "react-native";
import  { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { PROVIDER_GOOGLE }  from "react-native-maps";
import  OverlayComponent from "react-native-maps";
import { Overlay } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { IP } from "../constant.js";
import SwitchSelector from 'react-native-switch-selector';


const MapNightStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]




const Map = ({navigation}) => {

  const options = [
    { label: 'Today', value: 'todaysEvents' },
    { label: 'Next 3 Days', value: 'nextThreedays' },
    { label: 'Next 7 Days', value: 'nextSevendays' }
  ];
  




  const INITIAL_REGION = {
    latitude:31.4707 ,
    longitude:74.4098,
    latitudeDelta: 0.0012,
    longitudeDelta: 0.0099,
  };



// getEvents().then(x =>{ console.log(x.data[0].details);} )
  function getRandomArbitrary(min, max) {
    let ran = Math.random() * (max - min) + min;
    if ((ran>0 && ran<0.00003) || (ran<0 && ran>-0.00003)  ){
      return getRandomArbitrary(min, max);
    }
    else{
      return ran;
    }
  }


  let offset = getRandomArbitrary(-0.00007,0.00007);


  // const [region, setRegion] = useState(null);
  const [x, setx] = useState(false);


  const [markers, setMarkers] = useState(null);
  const [data,setData] = useState(null)

  const [selectedOption, setSelectedOption] = useState('todaysEvents');

  

  useEffect(() => {

    const ask_permission = async () => {
      console.log("asking for permission");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status== "granted"){
        console.log("Permission is granted");
        await Location.requestBackgroundPermissionsAsync();
        return
      }
      if (status !== "granted") {
        console.log("Permission is denied");
        navigation.navigate("homescreen")
        
        return;
      }}



    const getEvents = async ()=> {
      try{
        console.log("Inside API")
       
        const response = await axios.get(`${IP}/${selectedOption}` );
        
        // return response.data;
        setData(response.data.data)
       

      console.log("API CALL IS MADE")
      console.log(selectedOption)
      
      }catch(error){
        return error;
      }
  }

  // const displayMap = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     // Handle permission not granted error
  //     return;
  //   }
  //   setRegion({
  //     latitude:31.4707 ,
  //     longitude:74.4098,
  //     latitudeDelta: 0.0012,
  //     longitudeDelta: 0.0099,
  //   });
  // };

  ask_permission().then(()=>{
    console.log("Permission response recieved");
    return
  })

  getEvents().then(()=>{
    console.log("events done");
    return ;

  }).then(()=>{
    console.log("map done")
    setx(true)
    return true
  });

     
  }, [selectedOption]);

  if (!data){
    // console.log("Error Loading");
  return <Text>Loading....</Text>
  }
  
  const markerImage = require('../assets/markericon.png');
  const markerImageSize = { width: 39, height: 44 };
  
  return (
    <View style={styles.container}>
        
      <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle= {MapNightStyle} 
      region={INITIAL_REGION} 
      showsUserLocation= {true}
      clusterColor={"#00BDFE"}
      radius = {15}
      >

        {data.map((item,index) => {
                return (<Marker coordinate={{latitude: item.venue.coordinates[0] + getRandomArbitrary(-0.00006,0.00006)  , longitude: item.venue.coordinates[1]+ getRandomArbitrary(-0.00006,0.00006) }} title={item.title} description={item.room}
                        // image ={ require("../assets/markericon.png")  }
                         key = {index}>
                         <Image source={markerImage} style={markerImageSize} />
                         </Marker>
                         )
               })}
        
       
        
            

        
      </MapView>
        <View style={backstyle.backButton}>

        <TouchableOpacity style={backstyle.backButton} onPress={() => navigation.navigate("testing")}>
          <Text style={backstyle.backButtonText}>Back</Text>
        </TouchableOpacity>


        </View>

        <View style={overlaystyles.overlay}>

        <SwitchSelector
              options={options}
              initial={0}
              onPress={value => setSelectedOption(value)}
              selectedColor="#fff"
              buttonColor="#007AFF"
              borderColor="#007AFF"
            />

        </View>
        

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});


const overlaystyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 35,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 2
  }
});


const backstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    flex: 1
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5
  },
  backButtonText: {
    color: '#007AFF',
    fontWeight: 'bold'
  }
});

export default Map;