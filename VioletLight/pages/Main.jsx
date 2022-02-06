import * as Battery from 'expo-battery';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import List from './List';

const Main = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [name, setName] = useState('');
    const [distance, setDistance] = useState("");

    const getBatteryLevel = async () => {
        const { level } = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
    }

    const makeGroup = async () => {
        console.log(name);
        let obj = {};
        obj.distance = distance;
        await fetch("http://128.180.206.51:3000/api/makeGroup", {
            body: JSON.stringify({"distance": distance}),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    const alertFunction = async () =>{
        // ERICK CODE HERE
    }

    const generateID = async () => {
        //Generate a random number XXXX
        //compare this generated number with all ID's currently in the database
        //if this number matches any one of them generate a new random number and redo
        //if this number does not match any of them then set this number to be the meeting ID 
        //create a new group on server with this meeting ID and display
        
    }

    const checkLocation = async () => {

        //check the current location of the device
        //send this information to the server
    }

    const checkBattery = async () => {

        //check the current battery of the device
        //send this information to the server
    }

    const checkFriends = async () => {

        //pull from server all info about friends in party
        //check if any of the values go outside the constraints
        //if values exceed constraints then send an alert to the user
        //if values are okay then display the info in the table

    }

    const [view, setView] = useState("A");

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
                        style ={{width: 300, height:400,  top: 60, left: 10}}
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
<<<<<<< HEAD
                                    style={styles.nameInput} placeholder='          Enter Your Name' onChangeText={setName} value={name}/>
=======
                        style={styles.nameInput}
                        placeholder='          Enter Your Name' onChange={setName} />

                        <TextInput 
                        style={styles.nameInput}
                        placeholder='  Enter Your Phone Number' onChange={setName} />

                        
>>>>>>> 5d291bab2aa36c44912729c2edc06224010289ed
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
                        placeholder='          Enter Your Name' onChange={setName} />

                        <TextInput 
                        style={styles.nameInput}
                        placeholder='  Enter Your Phone Number' onChange={setName}/>


                        <TouchableOpacity style={styles.create}  onPress={() => setView("E")} title="Join Group">
                            <Text style={styles.textCreate}>Join</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </>
                

                )}
                {view === "E" && (
                    <>
                        {/* <Text>group view</Text>
                        <Button title='End party' onPress={() => setView("A")} title="Done"/>

                        
                        <TouchableOpacity style={styles.startbtn}  onPress={alertFunction}>
                        <Text style={styles.startbtnText}>Alert!</Text>
                    </TouchableOpacity> */}
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
        bottom: -30,
        paddingTop:15,
        paddingBottom:15,

    },
    joinGrp: {
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'rgb(220, 157, 250)',
        bottom: -80,
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