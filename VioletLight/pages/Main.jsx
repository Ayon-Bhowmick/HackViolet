import * as Battery from 'expo-battery';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';


const Main = ( {route, navigation } : any) => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [text, setText] = useState('');
    const [name, setName] = useState('bob');

    const getBatteryLevel = async () => {
        const { level } = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
    }
    const [view, setView] = useState("A");

    return (
            <View style={styles.container}>
                {view === "A" && (
                <>
                    <Text style={styles.violetlight}>VioletLight</Text>
                    <TouchableOpacity style={styles.startbtn}  onPress={() => setView("B")} title="Start">
                        <Text style={styles.startbtnText}>start</Text>
                    </TouchableOpacity>
                    
                   
                </>
                
                )}
                {view === "B" && (
                <>
                    <Text style={styles.header}>VioletLight</Text>
                    <TouchableOpacity style={styles.createGrp}  onPress={() => setView("C")} title="Create Group">
                        <Text style={styles.textBtn}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinGrp}  onPress={() => setView("D")} title="Join Group">
                        <Text style={styles.textBtn}>Join Group</Text>
                    </TouchableOpacity>
                    <Button title='Back' onPress={() => setView("A")} title="Back"/>
                </>
                )}
                {view === "C" && (
                <>
                    <Text style={styles.header}>VioletLight</Text>
                    
                    <TouchableOpacity style={styles.inputContainer}>
                        <Text style={styles.enterName}>Enter Your Name:</Text>
                        <TextInput 
                        style={styles.nameInput}
                        placeholder='               Your Name'/>

                        <Text>enter distance</Text>
                        <TextInput 
                        style={styles.distanceInput}
                        placeholder='               Max Distance'/>
                        <TouchableOpacity style={styles.create}  onPress={() => setView("E")} title="Join Group">
                            <Text style={styles.textBtn}>Create</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
                    
                </>
                
                )}
                {view === "D" && (
                <>
                    <Text style={styles.header}>VioletLight</Text>
                    <Text>enter ID</Text>
                    <Button title='Done' onPress={() => setView("E")} title="Start"/>
                </>
                

                )}
                {view === "E" && (
                    <>
                        <Text>group view</Text>
                        <Button title='End party' onPress={() => setView("A")} title="Done"/>
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
        bottom: -450,
        paddingTop:15,
        paddingBottom:15,

    },
    joinGrp: {
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'rgb(220, 157, 250)',
        bottom: -500,
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
        
    }

  });
export default Main;