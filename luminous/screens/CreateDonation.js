import React, {useState} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import axios from "axios";
  import { IP } from "../constant.js";

const CreateDonation = ({navigation}) => {
    const [don_id, setDonId] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [required, setRequired] = useState(0);
    const [collected, setCollected] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [acc_name, setAccName] = useState('');
    const [acc_num,setAccNum] = useState(0)
    const [iban, setIban] = useState('');

    const handleAddDontaion = async () => {
        try {
            const resp = await axios.post(`${IP}/pushDonationsData`,{
                don_id,
                category,
                title,
                img,
                required,
                collected,
                acc_name,
                acc_num,
                iban,
            });
            console.log(resp.data)
        }
        catch (error) {
            console.log(error)
        }
    }

      return (
          <LinearGradient style={styles.container} colors={["#000000", "#0E2C4F"]}>
          <ScrollView>
            <Text style={styles.signUpTitle}>Add Donation Case</Text>

            <Text style={styles.inputText}>Category</Text>
            <View style={styles.inputView}>
            
              <TextInput
                style={styles.inputText}
                placeholder="Zakat"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setCategory(text)}
                value={category}
              />
            </View>

            <Text style={styles.inputText}>Title</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
            </View>

            <Text style={styles.inputText}>Image</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setImg(text)}
                value={img}
              />
            </View>

            <Text style={styles.inputText}>Required Amount</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setRequired(text)}
                value={required}
              />
            </View>

            <Text style={styles.inputText}>Collected Amount</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setCollected(text)}
                value={collected}
              />
            </View>

            <Text style={styles.inputText}>Case Deadline</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setDeadline(text)}
                value={deadline}
              />
            </View>

            <Text style={styles.inputText}>Account Name</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setAccName(text)}
                value={acc_name}
              />
            </View>

            <Text style={styles.inputText}>Account Number</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setAccNum(text)}
                value={acc_num}
              />
            </View> 

            <Text style={styles.inputText}>IBAN</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setIban(text)}
                value={iban}
              />
            </View> 

            <TouchableOpacity style={styles.addBtn} onPress={handleAddDontaion}>
              <Text style={styles.loginText}>Create Donation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("donations")}>
            </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      
    },
    inputView: {
      width: "85%",
      backgroundColor: "black",
      borderColor: "#2482C7", // Add matching border color
      borderWidth: 2, // Add border width
      borderRadius: 25,
      height: 50,
      marginTop: -10,
      marginBottom: 5,
      justifyContent: "center",
      padding: 27, // Decrease padding
    },
    inputText: {
      height: 50,
      color: "white",
    },
    addBtn: {
      width: "50%",
      backgroundColor: "#2482C7",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 40,
      marginBottom: 10,
    },
    loginText: {
      color: "white",
      fontSize: 15, // Increase font size
    },
    signupText: {
      color: "white",
      // marginTop: 15,
    },
    signUpTitle: {
      fontSize: 27,
      fontWeight: "bold",
      color: "white",
      marginTop: 50,
      marginBottom: 20,
      justifyContent: "center",
      textAlign: "center",
    },
  });
  

export default CreateDonation;