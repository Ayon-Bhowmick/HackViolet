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
        <>
        <SafeAreaView>
            <View>
                {/* The button which will take you to the page to create a group where you will input your name and then the distance */}
                
                {/* This button will take you to a page where you  can enter the party code or maybe scan a QR code*/}
                
                {/* <Text>Battery Level: {batteryLevel}</Text>
                <TextInput onChangeText={setText} value={text} />
                <Button title="send" onPress={getBatteryLevel} /> */}
            </View>
            <View style={styles.container}>
                {view === "A" && (
                <>
                    <Text>Default</Text>
                    <Button title='Start' onPress={() => setView("B")} title="Start"/>
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
        </SafeAreaView>
        </>
    );
    

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AAA',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Main;