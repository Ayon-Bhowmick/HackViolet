import { StyleSheet, Dimensions, Text, TouchableOpacity, View, Image, SafeAreaView, Button, Alert, Platform, StatusBar } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const List = () => {
  const handlePress = () => console.log("Text Pressed")
  console.log(Dimensions.get("screen"));
  
  return (
    <SafeAreaView style={styles.container}>
    {/* <SafeAreaView style={{backgroundColor:"orange"}}> */}
    <View style={{
      backgroundColor: 'green',
      width: '80%',
      height: 70
    }}></View>


    <Button
        color="red"
        title="Prompt Here"
        onPress={() => 
          Alert.prompt("My Title", "My message", text => console.log(text))}
      />
      
      <Button
        color="orange"
        title="Click Me"
        // onPress={() => alert('Button Tapped')} // generic alert
        onPress={() => Alert.alert("My Title", "My message", [
          {text: "Yes", onPress: () => console.log("Yes")},
          {text: "No", onPress: () => console.log("No")},
        ])}

      />

      <Text numberOfLines={1} onPress={handlePress}>Hello World</Text>
      <Text>Hello React Native</Text>
      {/* <Image source={require('./assets/icon.png')} /> */}
      <TouchableOpacity onPress={() => console.log("Image tapped")}>
        <Image 
          // blurRadius={10}
        source={{
          width: 200,
          height: 300,
          uri: "https://picsum.photos/200/300"}} />
          
      </TouchableOpacity>
      <View style={{width:300, height:70, backgroundColor:"purple"}}></View>

    </SafeAreaView>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default List;