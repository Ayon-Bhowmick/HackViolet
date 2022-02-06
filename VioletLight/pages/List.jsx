import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

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
    </View>
  );
};