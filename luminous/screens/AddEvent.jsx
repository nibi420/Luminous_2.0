import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { IP } from "../constant.js";
import axios from 'axios';
import Loading from '../components/Loading.jsx';



const AddEventScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [venueName, setVenue] = useState('');
    const [categoryName, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [info, setInfo] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [showVenueModal, setShowVenueModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);


    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setDate(selectedDate);
    };


    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        setTime(selectedTime);
    };

    const handleSubmit = async () => {
        try {
            const eventData = {
                title,
                venueName,
                time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
                details: info,
                room: roomNumber || null,
                categoryName,
            };
            const response = await axios.post(`${IP}/addEvent`, eventData);
            console.log(response.data);
            // handle success or error response from server
        } catch (error) {
            console.error(error);
            // handle error
        }
    };

    const toggleVenueModal = () => {
        setShowVenueModal(!showVenueModal);
    };
    const toggleCategoryModal = () => {
        setShowCategoryModal(!showCategoryModal);
    };

    const [request, setRequest] = useState({ categories: null, venues: null })

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${IP}/getVenues`);
                // setData(response.data);
                const catresponse = await axios.post(`${IP}/getDonationCategories`, { type: "events" });//Events Ki catergories arahi hain


                setRequest({ categories: catresponse.data, venues: response.data });
                console.log(request.venues);


            } catch (error) {
                console.log("Error Caught in useeffect AddEvents")
                console.error(error);

            }
        };
        fetchData()
    }, [1]);

    if (!request.venues) {


        return <Loading />

    }



    return (

        <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Event</Text>
                    <Text style={styles.subText}>Please enter details</Text>
                </View>

                <ScrollView>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
                        {image ? (
                            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#c4c4c4', borderRadius: 20, overflow: 'hidden', width: 300, height: 200 }}>
                                <Image source={{ uri: image }} style={{ flex: 1 }} resizeMode="cover" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#c4c4c4', borderRadius: 20, padding: 20, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Ionicons name="add" size={32} color="white" />
                                <Text style={{ color: 'white', marginLeft: 5 }}>Select Image</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Enter event title"
                        placeholderTextColor='grey'
                    />

                    <Text style={styles.label}>Venue</Text>

                    <TouchableOpacity style={styles.venue} onPress={toggleVenueModal}>
                        <Text style={styles.venueText}>{venueName || 'Select a venue'}</Text>
                        <Ionicons name="chevron-down-outline" size={20} color="white" />
                    </TouchableOpacity>

                    {showVenueModal && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showVenueModal}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity onPress={toggleVenueModal} style={styles.modalBackdrop} />
                                <View style={styles.modalContent}>
                                    <FlatList
                                        data={request.venues.map((item) => { return item.name })} // replace with your list of venues
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.modalItem}
                                                onPress={() => {
                                                    setVenue(item);
                                                    toggleVenueModal();
                                                }}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}


                    <Text style={styles.label}>Category</Text>

                    <TouchableOpacity style={styles.venue} onPress={toggleCategoryModal}>
                        <Text style={styles.venueText}>{categoryName || 'Select a Category'}</Text>
                        <Ionicons name="chevron-down-outline" size={20} color="white" />
                    </TouchableOpacity>

                    {showCategoryModal && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showCategoryModal}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity onPress={toggleCategoryModal} style={styles.modalBackdrop} />
                                <View style={styles.modalContent}>
                                    <FlatList
                                        data={request.categories.map((item) => { return item.name })} // replace with your list of venues
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.modalItem}
                                                onPress={() => {
                                                    setCategory(item);
                                                    toggleCategoryModal();
                                                }}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}

                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimePickerContainer}>
                            <Ionicons name="calendar" size={20} color="#666666" style={styles.dateTimePickerIcon} />
                            <TouchableOpacity style={styles.dateTimePicker} onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.dateTimePickerText}>{date.toDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <View style={styles.dateTimePickerContainer}>
                            <Ionicons name="time" size={20} color="#666666" style={styles.dateTimePickerIcon} />
                            <TouchableOpacity style={styles.dateTimePicker} onPress={() => setShowTimePicker(true)}>
                                <Text style={styles.dateTimePickerText}>{time.toLocaleTimeString()}</Text>
                            </TouchableOpacity>
                        </View>

                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}

                    </View>

                    <Text style={styles.label}>Details:</Text>
                    <TextInput
                        style={styles.info}
                        onChangeText={setInfo}
                        value={info}
                        multiline
                        maxLength={500}
                        placeholder="Enter event info"
                        placeholderTextColor='rgba(255,255,255,0.4)'
                    />

                    <Text style={styles.label}>Room Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRoomNumber}
                        value={roomNumber}
                        placeholder="Enter room number"
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        maxLength={40}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Add Event</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>



        </LinearGradient>

    );
};

const styles = {
    container: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: 'white',

    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: 'grey',
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
    },
    info: {
        borderWidth: 2,
        borderColor: '#2E96D2',
        borderRadius: 5,
        color: 'white',
        height: 150,
        textAlignVertical: "top",
        // textAlign:"left",
        padding: 10,
        fontSize: 15,

    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginVertical: 10,
        color: 'white',
        fontSize: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: '#2E96D2',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        color: 'white',
        fontSize: 15,
    },
    venue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(33, 112, 167, 0.8)',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2E96D2',
    },
    venueText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#2E96D2',
        borderRadius: 10,
        padding: 20,
        width: '90%',

    },
    flatList: {
        flexGrow: 0,
        marginBottom: 20,

    },
    dateTimeContainer: {
        marginVertical: 20,
        backgroundColor: 'rgba(33, 112, 167, 0.3)',
        padding: 10,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#2E96D2',
    },
    dateTimePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateTimePickerIcon: {
        marginRight: 10,
        color: 'white'
    },
    dateTimePicker: {
        backgroundColor: 'rgba(0, 0,0, 0.5)',
        borderWidth: 2,
        borderColor: '#2E96D2',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        flex: 1,
    },
    dateTimePickerText: {
        color: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2E96D2',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

export default AddEventScreen;