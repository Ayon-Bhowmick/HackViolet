import { getBatteryLevelAsync } from 'expo-battery';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, Text, View, Alert } from 'react-native';
import * as Device from 'expo-device';

export default App = () => {



  const alertFunction = async () => {

    //console log that the alert was activated
    console.log("ALERT ACTIVATED")

    //get the name of the person sending the alert
    

    //hard code in a message
    //fetch the api for twillio
    //send to each person in the database
  

    

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
	setInterval(checkBatteryLocation, 60000);
    //check the current battery of the device
    let battery = await getBatteryLevelAsync();
    let percentage = Math.round(battery * 100);
    console.log(percentage);

    const location = await (await fetch("http://128.180.206.51:3000/api/getLocation")).json();
  	const current = await Location.getCurrentPositionAsync();
    const cord = [ current.coords.latitude, current.coords.longitude ];
	const nameNumber = await (await fetch("http://128.180.206.51:3000/api/getNameNumber", {
		body: JSON.stringify({"device": Device.deviceName}),
	})).json();
	let distance = Math.sqrt(Math.pow((cord[0] - location[0]), 2) + Math.pow((cord[1] - location[1]), 2));
	
    //send this information to the server
    //find the user based on their device info
    //to a put request to server to update battery percentage
	await fetch("http://128.180.206.51:3000/api/update", {
		body: JSON.stringify({"device": Device.deviceName, "name": nameNumber[0], "distance": distance, "battery": percentage, "number": nameNumber[1]})
	});
    

  }

  setInterval(checkBatteryLocation, 60000);

  //this function checks the location and battery of all friends
  async function checkFriends() {

    //TODO integrate this functionally into the app
    let distance = Math.sqrt(Math.pow((currentlocation[0] - friendlocation[0]), 2) + Math.pow((currentlocation[1] - friendlocation[1]), 2))
    //for loop to go through everyones location

  }

  useEffect(() => {
    checkBatteryLocation()

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