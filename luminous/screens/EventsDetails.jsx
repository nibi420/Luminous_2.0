import { useRef, useEffect } from "react";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EventDetailsFunc = ({ route, navigation }) => {


    const [daysLeft, setDaysLeft] = useState(0);
    const date = new Date(route.params.time);
    const endDate = new Date(route.params.endTime)
    const date_format = moment(route.params.time);
    const endtime_format = moment(route.params.endTime);
    const formattedDate = date_format.format("DD/MM/YYYY");
    const formattedTime = date_format.format('hh:mm A');
    const formattedEndTime = endtime_format.format('hh:mm A');


    // const result = (route.params.collected / route.params.required) * 100;
    // const percentage = `${result.toFixed(2)}%`;

    useEffect(() => {
        const today = new Date();
        const differenceInTime = date.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        setDaysLeft(differenceInDays);
    }, [date]);

    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            // height / 3,
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);
    console.log(route.params)
    const region = {

        latitude: route.params.venue.coordinates[0],
        longitude: route.params.venue.coordinates[1],
        latitudeDelta: 0.000012,
        longitudeDelta: 0.000099,
    }
    const prop = { region: region, date: date }

    return (

        <View style={styles.container}>

            <TouchableOpacity style={[styles.closeButton, { zIndex: 2 }]} onPress={() => {
                navigation.goBack()
            }}>
                <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>


            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: route.params.picture.url,
                    }}
                    style={styles.image}
                />
                <LinearGradient
                    colors={["rgba(0,0,0,0)", "#0E2C4F", "rgba(0,0,0,255)"]}
                    style={styles.gradient}
                />

            </View>
            {/* </View> */}
            <Animated.View
                style={[
                    styles.textContainer,
                    { transform: [{ translateY }] },
                    { position: "absolute", width: width, left: 0 },
                ]}
            >
                <View style={[styles.textContainer1]}>
                    <ScrollView>
                        <View style={[styles.textContainer2]}>
                            <Text style={styles.text}>concert</Text>
                            <Text style={styles.title}>{route.params.title}</Text>

                            <View style={[styles.outercontainer, { flexDirection: "row", width: "100%" }]}>
                                <View
                                    style={[
                                        styles.transparentContainer,
                                        { width: "60%" },
                                    ]}
                                >

                                    <View style={[styles.containerBox, { width: "45%" }]}>
                                        <Text style={styles.text}>Hosted By:</Text>
                                        <Text style={styles.bluetext}>{route.params.postedBy.username}</Text>
                                    </View>
                                    <View style={[styles.containerBox, { width: "45%" }]}>
                                        <Text style={styles.text}>Venue</Text>
                                        <Text style={styles.bluetext}>{route.params.venue.name}</Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.containerBox,
                                            {
                                                width: "100%", marginTop: 20, flexDirection: "row",
                                                flexWrap: "wrap",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start"
                                            },
                                        ]}
                                    >
                                        <View style={[styles.containerBox, { width: "45%" }]}>
                                            <Text style={styles.centerText}>Starting:</Text>
                                            <Text style={styles.centerText}>{formattedTime}</Text>
                                        </View>
                                        <View style={[styles.containerBox, { width: "45%" }]}>
                                            <Text style={styles.centerText}>Ending:</Text>
                                            <Text style={styles.centerText}>{formattedEndTime}</Text>
                                            <Text style={styles.endDateStyle}>{endDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Text>

                                        </View>

                                    </View>
                                </View>

                                <View
                                    style={[
                                        styles.transparentContainer,
                                        { flex: 1, width: "20%", justifyContent: "center", flexDirection: "column" },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.containerBox,
                                            { margin: 10, justifyContent: "center", width: "100%", backgroundColor: "#2482C7" },
                                        ]}
                                    >
                                        <Text style={[styles.text, { textAlign: "center" }]}>
                                            {months[date.getMonth()]}
                                        </Text>
                                        <Text style={[styles.text, { textAlign: "center" }]}>
                                            {date.getDate()}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* <View paddingTop={30}> */}

                            <Text style={[styles.text, { paddingTop: 30 }]}>
                                {route.params.details}
                            </Text>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity
                                    style={[styles.mapBtn, { backgroundColor: "#2482C7" }]}
                                    onPress={() => navigation.navigate('mapall', prop)}
                                // onPress={handleLogin}
                                >
                                    <MaterialIcons name="location-on" size={24} color="white" />
                                    <Text style={styles.text}>See on Map</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,

    },
    container12: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
    },
    leftContainer: {
        flex: 2,
        flexDirection: "column",
    },
    rightContainer: {
        flex: 1,
    },
    topLeftContainer: {
        flex: 1,
        backgroundColor: "transparent",
    },
    bottomLeftContainer: {
        flex: 1,
        backgroundColor: "transparent",
    },
    centerText: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
    },
    mapBtn: {
        flexDirection: "row",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        width: "40%",
    },

    gradient: {
        zIndex: 2,
        position: "absolute",
        top: 80,
        bottom: 0,
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        height: "100%",
        width: "100%",
    },
    containerBox: {
        backgroundColor: "#444",
        padding: 5,
        margin: 0,
        borderRadius: 10,
    },

    outercontainer: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
        borderRadius: 5,
        // alignItems: "center",
        // justifyContent: "center",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },

    transparentContainer: {
        // flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    topLeft: {
        width: "48%",
    },
    topRight: {
        width: "48%",
    },
    bottomLeft: {
        width: "90%",
        marginTop: 20,
    },
    bottomRight: {
        width: "48%",
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    bluetext: {
        fontSize: 16,
        color: "skyblue",
    },
    textInCorner: {
        position: "absolute",
        color: "white",
    },
    container5: {
        backgroundColor: "black",
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        height: height,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "black",
    },

    imageContainer: {
        // flex: 1,
        height: "40%",
        width: "100%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },

    textContainer: {
        flex: 1,
        backgroundColor: "transparent",
        height: "100%",
        width: "100%",
        // left: 20,
        // right: 20,
        overflow: "visible",
    },
    textContainer1: {
        flex: 1,
        backgroundColor: "transparent",
        height: "100%",
        width: "100%",
        // paddingTop:"50%",
        // left: 20,
        // right: 20,
        overflow: "visible",
    },
    textContainer2: {
        flex: 1,
        backgroundColor: "transparent",
        height: "65%",
        width: "90%",
        paddingTop: "50%",
        left: 20,
        right: 20,
        overflow: "visible",
    },
    text: {
        fontSize: 16,
        color: "white",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 10,
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#007AFF",
        borderRadius: 5,
    },
    button: {
        color: "white",
        fontSize: 16,
    },
    endDateStyle: {
        fontSize: 8,
        fontWeight: "bold",
        color: "grey",
        textAlign: "center",
    }
});

export default EventDetailsFunc;
