import { getBatteryLevelAsync } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Alert } from 'react-native';

export default App = () => {

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


const checkBatteryLocation = async () => {

    //check the current battery of the device
    var battery = await getBatteryLevelAsync();
    var percentage = Math.round(battery *100);
    console.log(percentage);
    
    //check the current location
    

    //send this information to the server
}

useEffect(() => {
  checkBatteryLocation()
  return () => clearInterval(interval);
 }, []);


setInterval(checkBatteryLocation, 60000);

//this function checks the location and battery of all friends
async function checkFriends() {

    console.log("done")
  
}

useEffect(() => {
  checkFriends()

  return () => clearInterval(interval);
 }, []);


setInterval(checkFriends, 300000);


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}



      <Button
        color="red"
        title="Prompt Here"
        onPress={() => 
          Alert.prompt("My Title", "My message", text => console.log(text))}
      />
    </View>
  );
};