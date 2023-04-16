import { useRef, useEffect } from 'react';
import { Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { MaterialIcons } from "@expo/vector-icons";
import moment from 'moment'

const { width, height } = Dimensions.get('window');

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const GradientScreen = ({ route, navigation }) => {

    const [daysLeft, setDaysLeft] = useState(0);
    const date = new Date(route.params.deadline)
    const date_format = moment(route.params.deadline);
    const formattedDate = date_format.format('DD/MM/YYYY');

    const result = (route.params.collected / route.params.required) * 100;
    const percentage = `${result.toFixed(2)}%`;
    console.log(route.params)



    useEffect(() => {

        const today = new Date();
        const differenceInTime = date.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        setDaysLeft(differenceInDays);
    }, [date]);


    const translateY = useRef(new Animated.Value(height)).current;
    var req = 1;
    if(route.params.required == 0){
        req = 1;
    }
    else{
        req = route.params.required;
    }
    


    useEffect(() => {
        Animated.timing(translateY, {
            // height / 3,
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    return (
        <View style={styles.container}>

            <TouchableOpacity style={[styles.closeButton,{zIndex:2}]} onPress={() => {
              navigation.goBack()
          }}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
            

            <View style={styles.imageContainer}>
            {/* { uri: `https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?cs=srgb&dl=pexels-pixabay-267885.jpg&fm=jpg` } */}
                <Image source={{uri : route.params.picture.url}} style={styles.image} />
                <LinearGradient colors={['rgba(0,0,0,0)', '#0E2C4F', 'rgba(0,0,0,255)']} style={styles.gradient} />

            </View>

            <Animated.View style={[styles.textContainer, { transform: [{ translateY }] }, { position: "absolute", width: width, left: 0, }]}>
                <View style={[styles.textContainer1]}>

                    <ScrollView>
                        <View style={[styles.textContainer2]}>
                            <Text style={styles.text}>Posted by: Welfare Committee</Text>
                            <Text style={styles.title}>{route.params.post_title}</Text>

                            <View style={styles.container12}>
                                <View style={styles.leftContainer}>

                                    <View style={styles.bottomLeftContainer}>
                                        <Text style={[styles.subtitle, { color: "grey", fontWeight: 'bold' }]}>This is a demo screen</Text>
                                    </View>
                                </View>
                                <View style={styles.rightContainer}>
                                    <Text style={[styles.subtitle, { bottom: 0, right: 0, position: "absolute", color: "skyblue", fontWeight: 'bold' }]}>{percentage}</Text>
                                </View>
                            </View>

                            <View style={[styles.containerBox, { backgroundColor: "transparent" }]}>
                                <Progress.Bar progress={route.params.collected / req} color="skyblue" height={10} width={null} marginTop={-10} />
                            </View>

                            <View style={styles.transparentContainer}>
                                <View style={[styles.containerBox]}>
                                    <Text style={styles.text}>Name:</Text>
                                    <Text style={styles.bluetext}>Abdullah</Text>
                                </View>
                                <View style={[styles.containerBox, { flex: 1 }]}>
                                    <Text style={styles.text}>Phone:</Text>
                                    <Text style={styles.bluetext}>03444020321</Text>
                                </View>
                                <View style={[styles.containerBox, { flex: 1, backgroundColor: '#2482C7' }]}>

                                    <Text style={[styles.bluetext, { textAlign: "center", color: "black" }]}> {daysLeft} days left</Text>
                                </View>
                                <View style={[styles.containerBox, { backgroundColor: "black" }]}>
                                    <Text style={[styles.text, { color: "grey" }]}>Expires:</Text>
                                    <Text style={styles.bluetext}> {formattedDate}</Text>
                                </View>
                            </View>

                            <View style={styles.outercontainer}>
                                <Text style={[styles.subtitle, { textAlign: 'center' }]}>Bank Details:</Text>
                                <View style={styles.transparentContainer}>
                                    <View style={styles.topLeft}>
                                        <Text style={styles.text}>Account Name:</Text>
                                        <Text style={styles.bluetext}>{route.params.acc_name}</Text>
                                    </View>
                                    <View style={styles.topRight}>
                                        <Text style={styles.text}>Account Number</Text>
                                        <Text style={styles.bluetext}>{route.params.acc_num}</Text>
                                    </View>
                                    <View style={styles.bottomLeft}>
                                        <Text style={styles.text}>Bank Name:</Text>
                                        <Text style={styles.bluetext}>{route.params.bank_name}</Text>
                                    </View>
                                    <View style={styles.bottomRight}>
                                        <Text style={styles.text}>IBAN:</Text>
                                        <Text style={styles.bluetext}>{route.params.iban}</Text>
                                    </View>
                                </View>
                            </View>


                            <Text style={[styles.text,{paddingTop:30}]}>

                        
                                {/* fringilla dolor tristique. Donec eget orci et massa commodo
                                viverra non non sapien. Nunc id ligula sit amet risus fringilla
                                euismod. Sed imperdiet venenatis sapien non luctus. Pellentesque
                                at vestibulum metus, eu tincidunt quam. Integer semper maximus
                                tortor, id hendrerit nunc dapibus a. Nullam et nibh ex. */}

                                {route.params.description}
                            </Text>

                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TouchableOpacity
                                    style={[styles.loginBtn, { backgroundColor: "#2482C7" }]}
                                // onPress={handleLogin}
                                >
                                    <Text style={styles.text}>Pledge Now</Text>
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
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    leftContainer: {
        flex: 2,
        flexDirection: 'column',
    },
    rightContainer: {
        flex: 1,
    },
    topLeftContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    bottomLeftContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loginBtn: {
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
        position: 'absolute',
        top: 80,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: "100%",

    },
    containerBox: {
        backgroundColor: '#444',
        padding: 5,
        margin: 2,
        borderRadius: 10,
    },

    outercontainer: {
        flex: 1,
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',

    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    transparentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    topLeft: {
        width: '48%',
    },
    topRight: {
        width: '48%',
    },
    bottomLeft: {
        width: '48%',
        marginTop: 20,
    },
    bottomRight: {
        width: '48%',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    bluetext: {
        fontSize: 16,
        color: 'skyblue',
    },
    textInCorner: {
        position: 'absolute',
        color: 'white',
    },
    container5: {
        backgroundColor: 'black',
        justifyContent: 'space-between',
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
        width: "100%"
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
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
        color: "white"
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,

    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    button: {
        color: 'white',
        fontSize: 16,
    },
});

export default GradientScreen;
