import { useRef, useEffect } from 'react';
import { Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const GradientScreen = ({ route, navigation }) => {

    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: height / 3,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image source={{ uri: `${route.params.image}` }} style={styles.image} />
                <LinearGradient colors={['rgba(0,0,0,0)', '#0E2C4F', 'rgba(0,0,0,255)']} style={styles.gradient} />
            </View>

            <Animated.View style={[styles.textContainer, { transform: [{ translateY }] }, { position: "absolute", width: width, right: 0, left: 0 }]}>
                <View style={styles.textContainer}>

                    <ScrollView>
                        <Text style={styles.text}>Posted by: {route.params.post_title}</Text>
                        <Text style={styles.title}>{route.params.post_title}</Text>
                        <Text style={styles.subtitle}>This is a demo screen</Text>

                        <View style={[styles.containerBox, { backgroundColor: "transparent" }]}>
                            <Progress.Bar progress={12 / 15} color="skyblue" height={10} width={null} />
                        </View>

                        <View style={styles.transparentContainer}>
                            <View style={[styles.containerBox]}>
                                <Text style={styles.text}>Name:</Text>
                                <Text style={styles.bluetext}>Abdullah</Text>
                            </View>
                            <View style={styles.containerBox}>
                                <Text style={styles.text}>Phone:</Text>
                                <Text style={styles.bluetext}>Abdullah</Text>
                            </View>
                            <View style={[styles.containerBox, { flex: 1 }]}>
                                <Text style={styles.text}>Account Name:</Text>
                                <Text style={styles.bluetext}>Abdullah</Text>
                            </View>
                            <View style={[styles.containerBox, { backgroundColor: "black" }]}>
                                <Text style={[styles.text, { color: "grey" }]}>Expires:</Text>
                                <Text style={styles.bluetext}>Abdullah</Text>
                            </View>
                        </View>

                        <View style={styles.outercontainer}>
                            <Text style={[styles.subtitle, { textAlign: 'center' }]}>Bank Details:</Text>
                            <View style={styles.transparentContainer}>
                                <View style={styles.topLeft}>
                                    <Text style={styles.text}>Account Name:</Text>
                                    <Text style={styles.bluetext}>Abdullah</Text>
                                </View>
                                <View style={styles.topRight}>
                                    <Text style={styles.text}>Account Number</Text>
                                    <Text style={styles.bluetext}>Abafadhdgfhgggg</Text>
                                </View>
                                <View style={styles.bottomLeft}>
                                    <Text style={styles.text}>Bank Name:</Text>
                                    <Text style={styles.bluetext}>Abdullah</Text>
                                </View>
                                <View style={styles.bottomRight}>
                                    <Text style={styles.text}>IBAN:</Text>
                                    <Text style={styles.bluetext}>Abdullah</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>
                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>
                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>
                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>
                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>
                        <Text style={styles.text}>Namelkjhlkjlkjlhkjhghhgkhgkhgkhgjhgkjhgkghgjkhgkhg:</Text>


                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                            aliquam, augue sit amet aliquet congue, erat est ullamcorper
                            lectus, vel iaculis tellus felis vitae nibh. Sed eu enim leo.
                            Aenean convallis odio et tellus aliquam, vitae bibendum orci
                            accumsan. Ut luctus malesuada libero, vel tempor nulla. Sed
                            euismod auctor quam vel porttitor. Maecenas nec dui eu lorem
                            elementum imperdiet. Etiam finibus est a nisl malesuada, at
                            fringilla dolor tristique. Donec eget orci et massa commodo
                            viverra non non sapien. Nunc id ligula sit amet risus fringilla
                            euismod. Sed imperdiet venenatis sapien non luctus. Pellentesque
                            at vestibulum metus, eu tincidunt quam. Integer semper maximus
                            tortor, id hendrerit nunc dapibus a. Nullam et nibh ex.
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity
                                style={[styles.loginBtn, { backgroundColor: "#2482C7" }]}
                                // onPress={handleLogin}
                            >
                                <Text style={styles.text}>Pledge Now</Text>
                            </TouchableOpacity>
                           
                        </View>
                    </ScrollView>

                </View>
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
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
        top: 50,
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
        borderRadius: 1,
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
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: "black",
    },

    imageContainer: {
        // flex: 1,
        height: "30%",
        width: "100%"
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },

    textContainer: {
        flex: 1,
        backgroundColor: "transparent",
        height: "65%",
        width: "90%",

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
