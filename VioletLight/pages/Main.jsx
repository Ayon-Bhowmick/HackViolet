import * as Battery from 'expo-battery';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import List from './List';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
    const [name, setName] = useState('');
    const [distance, setDistance] = useState("");
    const [phone, setPhone] = useState("");

    const getLocationPermission = async () => {
        let permission = await Location.requestForegroundPermissionsAsync();
        while (permission.status !== 'granted') {
            permission = await Location.requestForegroundPermissionsAsync();
        }
    }

    const getLocation = async () => {
        getLocationPermission();
        const location = await Location.getCurrentPositionAsync();
        let cord = [ location.coords.latitude, location.coords.longitude ];
        return cord;
    }

    const getBatteryLevel = async () => {
        const bat = await Battery.getBatteryLevelAsync();
        const percent = Math.round(bat * 100);
        return percent;
    }

    const makeGroup = async () => {
        const cord = await getLocation();
        await fetch("http://128.180.206.51:3000/api/makeGroup", {
            body: JSON.stringify({"distance": distance, "location": cord}),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        await addSelf();
        setView("E");
    }

    const addSelf = async () => {
        const bat = await getBatteryLevel();
        const cord = await getLocation();
        const location = await (await fetch("http://128.180.206.51:3000/api/getLocation")).json();
        let distance = Math.sqrt(Math.pow((cord[0] - location[0]), 2) + Math.pow((cord[1] - location[1]), 2));
        try {
            await AsyncStorage.setItem("name", name);
            await AsyncStorage.setItem("phone", phone);
        } catch (error) {
            console.log(error);
        }
        await fetch("http://128.180.206.51:3000/api/update", {
            body: JSON.stringify({"device": Device.deviceName, "name": name, "distance": distance, "battery": bat, "number": phone}),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log("added self");
    }

    const generateID = async () => {
        //Generate a random number XXXX
        //compare this generated number with all ID's currently in the database
        //if this number matches any one of them generate a new random number and redo
        //if this number does not match any of them then set this number to be the meeting ID 
        //create a new group on server with this meeting ID and display
        
    }

        //check the current location of the device
        //send this information to the server
    const joinGroup = async () => {
        await addSelf().then(() => {setView("E")});
        // setView("E");
    }

    const [view, setView] = useState("A");

    useEffect(() => {
        getLocationPermission();
    }, []);

    return (
            <View style={styles.container}>
                {view === "A" && (
                <>
                    
                    <Text style={styles.violetlight}>VioletLight</Text>

                    <Image 
                        style ={{width: 450, height:750, top: 70, left: -20}}
                        source = {require('../assets/logoVioletLight.png')}
                    />
                    
                    <TouchableOpacity style={styles.startbtn}  onPress={() => setView("B")} title="Start">
                        <Text style={styles.startbtnText}>start</Text>
                    </TouchableOpacity>
                    
                   
                </>
                
                )}
                {view === "B" && (
                <>
                   
                    <Text style={styles.header}>VioletLight</Text>

                    <Image 
                        style ={{width: 300, height:400,  top: 40, left: 10}}
                        source = {require('../assets/logoCircle3.png')}
                    />

                    <TouchableOpacity style={styles.createGrp}  onPress={() => setView("C")} title="Create Group">
                        <Text style={styles.textBtn}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinGrp}  onPress={() => setView("D")} title="Join Group">
                        <Text style={styles.textBtn}>Join Group</Text>
                    </TouchableOpacity>
                                    
                </>
                )}
                {view === "C" && (
                <>
                    <Text style={styles.header}>VioletLight</Text>
                    
                    <TouchableOpacity style={styles.inputContainer}>
                        <TextInput 
                        style={styles.nameInput}
                        placeholder='          Enter Your Name' onChangeText={setName}  value={name}/>

                        <TextInput 
                        style={styles.nameInput}
                        placeholder='  Enter Your Phone Number' onChangeText={setPhone} value={phone} keyboardType="numeric"/>
                        
                        <TextInput 
                                    style={styles.nameInput}
                                    placeholder='         Enter Max Distance' onChangeText={setDistance} value={distance} keyboardType="numeric"/>
                        <TouchableOpacity style={styles.create}  onPress={makeGroup} title="Join Group">
                            <Text style={styles.textCreate}>Create</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
                    
                </>
                
                )}
                {view === "D" && (
                <>
                    <Text style={styles.header}>VioletLight</Text>
                    <TouchableOpacity style={styles.inputContainer}>
                        <TextInput 
                        style={styles.nameInput}
                        placeholder='          Enter Group ID'/>
                        
                        <TextInput 
                        style={styles.nameInput}
                        placeholder='          Enter Your Name' onChangeText={setName} value={name} />

                        <TextInput 
                        style={styles.nameInput}
                        placeholder='  Enter Your Phone Number' onChangeText={setPhone} value={phone} keyboardType="numeric"/>


                        <TouchableOpacity style={styles.create}  onPress={joinGroup} title="Join Group">
                            <Text style={styles.textCreate}>Join</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </>
                

                )}
                {view === "E" && (
                    <>
                        <List />
                    </>
                
                )}
            </View>
    );
    

};
const styles = StyleSheet.create({
    container: {

        
        height:'100%',
        width: '100%',
        backgroundColor: 'rgb(106, 90, 205)', 
        alignItems:'center',
        paddingTop: '10%'
        
      
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(220, 157, 250)'

    },
    startbtn: {
        position: 'absolute',
        bottom: 49,      
        alignSelf: 'center',
        paddingTop: '20%',
        height: 55,
        width: 90,
        alignItems: 'center'
        
    },

    startbtnText: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    violetlight: {
        fontSize: 65,
        fontWeight: 'bold',
        paddingTop: '20%',
        color: 'rgb(220, 157, 250)'
    },

    createGrp: {
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'rgb(220, 157, 250)',
        bottom: -10,
        paddingTop:15,
        paddingBottom:15,

    },
    joinGrp: {
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'rgb(220, 157, 250)',
        bottom: -50,
        paddingTop:15,
        paddingBottom:15,
      
    },
    textBtn: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',

    },

    nameInput: {
        borderWidth: 1,
        padding: 8,
        margin: 10,
        width: 200,
    },

    inputContainer: {
        top: '30%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },

    create: {
        backgroundColor: 'rgb(220, 157, 250)',

    },

    textCreate:{
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    }

  });
export default Main;