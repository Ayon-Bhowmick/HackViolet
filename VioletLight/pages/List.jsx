import { getBatteryLevelAsync } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, Text, View, Alert } from 'react-native';

export default App = () => {



  const alertFunction = async () => {
    console.log("ALERT ACTIVATED")
    // ERICK CODE HERE
  }

  const generateID = async () => {

    let ID = Math.floor(Math.random() * 1001);

    //Generate a random number XXXX
    //compare this generated number with all ID's currently in the database
    //if this number matches any one of them generate a new random number and redo
    //if this number does not match any of them then set this number to be the meeting ID 
    //create a new group on server with this meeting ID and display

    return ID;
  }


  const checkBatteryLocation = async () => {

    //check the current battery of the device
    let battery = await getBatteryLevelAsync();
    let percentage = Math.round(battery * 100);
    console.log(percentage);


    //get location
    const location = await Location.getCurrentPositionAync();
    let cord = [ locatoin.coords.latitude, location.coords.longitude]

  
    //send this information to the server
    //find the user based on their device info
    //to a put request to server to update battery percentage

    

  }

  useEffect(() => {
    checkBatteryLocation()
    return () => clearInterval(interval);
  }, []);


  setInterval(checkBatteryLocation, 60000);

  //this function checks the location and battery of all friends
  async function checkFriends() {




    //TODO integrate this functionally into the app
    let distance = Math.sqrt(Math.pow((currentlocation[0] - friendlocation[0]), 2) + Math.pow((currentlocation[1] - friendlocation[1]), 2))
    //for loop to go through everyones location



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
      {isLoading ? <ActivityIndicator /> : (
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
        title="Emergency"
        // onPress={() => alert('Button Tapped')} // generic alert
        onPress={() => Alert.alert("Are you sure you want to send alert?", " ", [
          { text: "No", onPress: () => console.log("No") },
          { text: "Yes", onPress: () => { alertFunction() } },
        ])}

      />

    </View>
  );
};