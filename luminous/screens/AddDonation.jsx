import React, { useState, useEffect } from 'react';

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
import DateTimePicker from '@react-native-community/datetimepicker'; import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';


const AddDonation = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [post_title, setTitle] = useState('');
  const [description, setDesc] = useState('')
  const [required, setRequired] = useState('');
  const [collected, setCollected] = useState('');
  const [acc_name, setAccName] = useState('');
  const [bank_name, setBankName] = useState('');
  const [acc_num, setAccNum] = useState('')
  const [iban, setIban] = useState('');

  const [showCategoryModal, setCategoryModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [existingcategories, setCategories] = useState({})

  const [image, setImage] = useState('');

  const [name, setNewCategory] = useState('');
  const [newCat, setNewCat] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const catresponse = await axios.post(`${IP}/getDonationCategories`, { type: "donations" });
        console.log(catresponse.data)

        setCategories((catresponse.data).map((category) => {
          return category.name;
        }));

      } catch (error) {
        console.log("dsjflsdhfajsdhfaskd")
        console.error(error);

      }
    };

    getCategories();
  }, [newCat]);

  const handleDonationSubmit = async () => {
    try {

      var deadline = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
      deadline = deadline.toUTCString();
      console.log('herer22')
      const formData = new FormData();
      formData.append("category",category)
      formData.append("post_title",post_title)
      formData.append("description",description)
      formData.append("required",required)
      formData.append("collected",collected)
      formData.append("deadline",deadline)
      formData.append("acc_name",acc_name)
      formData.append("acc_num",acc_num)
      formData.append("bank_name",bank_name)
      formData.append("iban",iban)
      formData.append('image', {
        uri: image,
        type: mime.getType(image),
        name: image.split('/').pop(),
      });
     
      // const resp = await axios.post(`${IP}/pushDonationsData`, {
      //   category,
      //   post_title,
      //   required,
      //   collected,
      //   deadline: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
      //   acc_name,
      //   acc_num,
      //   bank_name,
      //   iban,
      // });
      
      const resp2 = await axios.post(`${IP}/pushDonationsData`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      // console.log(resp2.data)
      console.log('herer')
      navigation.goBack();
    
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleCategorySubmit = async () => {
    try {
      const resp = await axios.post(`${IP}/pushDonationCategories`, {
        name,
        type: "donations",
      });
      console.log(resp.data)
      setNewCat(newCat+1)
     


    } catch (error) {
      console.log(error)
    }
  }

  const toggleCategoryModal = () => {
    if(name !== ''){
      handleCategorySubmit();
    }
    
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

      <View height={'17%'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Add Donation Case</Text>
        <Text style={styles.subText}>Please enter details</Text>
      </View>
      <ScrollView marginBottom={20}>

        <Text style={styles.label}>New Category</Text>
        <View >
          <TextInput
            placeholder="0"
            style={styles.input}
            onChangeText={(text) => setNewCategory(text)}
            value={name}
          />
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={handleCategorySubmit} >
          <Text style={styles.buttonText}>Create Category</Text>
        </TouchableOpacity> */}


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

        <Text style={styles.label}>Image (Optional)</Text>
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
        <View >
          <TextInput
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
            value={post_title}
          />
        </View>

        <Text style={styles.label}>Description</Text>
        <View>
          <TextInput
            placeholder="Please write a short description of the case"
            style={styles.input}
            onChangeText={(text) => setDesc(text)}
            value={description}
          />
        </View>

        <Text style={styles.label}>Required Amount</Text>
        <View >
          <TextInput
            placeholder="0"
            style={styles.input}
            onChangeText={(text) => setRequired(text)}
            value={required}
          />
        </View>

        <Text style={styles.label}>Collected Amount</Text>
        <View >
          <TextInput
            placeholder="0"
            style={styles.input}
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
        <View >
          <TextInput
            placeholder=""
            style={styles.input}
            onChangeText={(text) => setAccName(text)}
            value={acc_name}
          />
        </View>

        <Text style={styles.label}>Account Number</Text>
        <View >
          <TextInput
            placeholder=""
            style={styles.input}
            onChangeText={(text) => setAccNum(text)}
            value={acc_num}
          />
        </View>

        <Text style={styles.label}>Bank Name</Text>
        <View s>
          <TextInput
            placeholder="Title"
            style={styles.input}
            onChangeText={(text) => setBankName(text)}
            value={bank_name}
          />
        </View>

        <Text style={styles.label}>IBAN (optional)</Text>
        <View >
          <TextInput
            placeholder=""
            style={styles.input}
            onChangeText={(text) => setIban(text)}
            value={iban}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDonationSubmit} >
          <Text style={styles.buttonText}>Create Donation</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("donations")} marginBottom={20}>
            </TouchableOpacity> */}
      </ScrollView>

    </LinearGradient>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
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
    color: '#ffffff',
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
    marginBottom: 20,
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

export default AddDonation;