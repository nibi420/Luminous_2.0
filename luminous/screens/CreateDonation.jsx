import React, {useState,useEffect} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Modal,
    FlatList
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import axios from "axios";
  import { IP } from "../constant.js";
  import DateTimePicker from '@react-native-community/datetimepicker';  import Ionicons from 'react-native-vector-icons/Ionicons';


const CreateDonation = ({navigation}) => {
    const [category, setCategory] = useState('');
    const [post_title, setTitle] = useState('');
    const [description, setDesc] = useState('')
    const [image, setImg] = useState('');
    const [required, setRequired] = useState('');
    const [collected, setCollected] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [acc_name, setAccName] = useState('');
    const [bank_name, setBankName] = useState('');
    const [acc_num,setAccNum] = useState('')
    const [iban, setIban] = useState('');

    const [showCategoryModal, setCategoryModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [existingcategories, setCategories] = useState({})

    useEffect(() => {
      const getCategories = async () => {
        try {
          const catresponse = await axios.post(`${IP}/getDonationCategories`,{type:"donations"});
          console.log(catresponse.data)
  
          setCategories((catresponse.data).map((category)=>{
            return category.name;
          }));          
  
        } catch (error) {
          console.log("dsjflsdhfajsdhfaskd")
          console.error(error);
  
        }
      };
  
      getCategories();
    }, [1]);

    const handleDonationSubmit = async () => {
        try {
            const resp = await axios.post(`${IP}/pushDonationsData`,{
                category,
                post_title,
                image,
                required,
                collected,
                deadline,
                acc_name,
                acc_num,
                bank_name,
                iban,
            });
            console.log(resp.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const toggleCategoryModal = () => {
      setCategoryModal(!showCategoryModal);
  };

    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      setDate(selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
      setShowTimePicker(false);
      setTime(selectedTime);
  };

      return (
          <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
          <ScrollView>
            <Text style={styles.input}>Add Donation Case</Text>

            <Text style={styles.label}>Category</Text>

                <TouchableOpacity style={styles.venue} onPress={toggleCategoryModal}>
                    <Text style={styles.venueText}>{category || 'Select a Category'}</Text>
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
                                    data={existingcategories} // replace with your list of venues
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

            <Text style={styles.label}>Title</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setTitle(text)}
                value={post_title}
              />
            </View>
            
            <Text style={styles.label}>Image</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setImg(text)}
                value={image}
              />
            </View>

            <Text style={styles.label}>Description</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setDesc(text)}
                value={description}
              />
            </View>

            <Text style={styles.label}>Required Amount</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setRequired(text)}
                value={required}
              />
            </View>

            <Text style={styles.label}>Collected Amount</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setCollected(text)}
                value={collected}
              />
            </View>

            <Text style={styles.label}>Case Deadline</Text>
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

            <Text style={styles.label}>Account Name</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setAccName(text)}
                value={acc_name}
              />
            </View>

            <Text style={styles.label}>Account Number</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setAccNum(text)}
                value={acc_num}
              />
            </View> 

            <Text style={styles.label}>Bank Name</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setBankName(text)}
                value={bank_name}
              />
            </View>

            <Text style={styles.label}>IBAN</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setIban(text)}
                value={iban}
              />
            </View> 

            

            <TouchableOpacity style={styles.button} onPress={handleDonationSubmit}>
              <Text style={styles.buttonText}>Create Donation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("donations")}>
            </TouchableOpacity>
            </ScrollView>
        
        

        <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="map-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton]}>
          <Ionicons name="calendar-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton]}>
          <Ionicons name="home-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selectedNavButton]}>
          <Ionicons name="heart-outline" size={24} color="blue" />
          <Text style={[styles.navText, styles.selectedNavText]}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#aaa" />
          <Text style={[styles.navText]}>Account</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
      );
}
  
  const styles = {
    container: {
        flex: 1,
        padding: 20,
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
        backgroundColor: 'rgba(33, 112, 167, 0.3)',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
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
        backgroundColor: '#fff',
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
        backgroundColor: 'rgba(33, 112, 167, 0.8)',
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
  }

export default CreateDonation;