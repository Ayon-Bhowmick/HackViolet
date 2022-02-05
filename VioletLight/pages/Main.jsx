import * as Battery from 'expo-battery';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

const Main = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [text, setText] = useState('');

    const getBatteryLevel = async () => {
        const { level } = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
    }

    return (
        <SafeAreaView>
            <View>
                <Text>Battery Level: {batteryLevel}</Text>
                <TextInput onChangeText={setText} value={text} />
                <Button title="send" onPress={getBatteryLevel} />
            </View>
        </SafeAreaView>
    );
    

}

export default Main;