import * as Battery from 'expo-battery';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';


const Main = ( {route, navigation } : any) => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [text, setText] = useState('');

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
                    <Button style={styles.startbtn} title='Start' onPress={() => setView("B")} title="Start"/>
                   
                </>
                
                )}
                {view === "B" && (
                <>
                    <Text>Home</Text>
                    <Button title='Create Group' onPress={() => setView("C")} title="Create Group"/>
                    <Button title='Join Group' onPress={() => setView("D")} title="Join Group"/>
                    <Button title='Back' onPress={() => setView("A")} title="Back"/>
                </>
                )}
                {view === "C" && (
                <>
                    <Text>Create group</Text>
                    <Text>enter name</Text>
                    <Text>enter distance</Text>
                    <Button title='Done' onPress={() => setView("E")} title="Start"/>
                </>
                
                )}
                {view === "D" && (
                <>
                    <Text>Join group</Text>
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
    startbtn: {
        position: 'absolute',
        bottom:0,
        left:0,
        top: 100
    
    },

    violetlight: {
        fontSize: 65,
        fontWeight: 'bold',
        paddingTop: '20%',
        color: 'rgb(220, 157, 250)'
    }
  });
export default Main;