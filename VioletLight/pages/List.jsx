import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Button, Alert, FlatList, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import * as Location from 'expo-location';


 
const List = () => {
  const alertFunction = async () => {

    //put the whole thing in a for loop and send to each person

    //console log that the alert was activated
    console.log("ALERT ACTIVATED")

    //get the name of the person sending the alert
    let name = 'bob';
    let message = {to:"3475268828", message: `${name} has sent an EMERGENCY ALERT!!!`};

    //fetch the api for twillio
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      })

    //    constructor(props) {
    //      console.log("on costruct")
    //        super(props);
    //        this.state = {
    //          message: {
    //            to: '',
    //            body: ''
    //          },
    //          submitting: false,
    //          error: false
    //        };
    //        console.log(this.state);
    //        console.log("before onHandle");
    //        this.onHandleChange = this.onHandleChange.bind(this);
    //        console.log("before onSubmit");
    //        this.onSubmit=this.onSubmit.bind(this);
    //      }
    // //send to each person in the database
  

    

  }

  const getLocation = async () => {
        const location = await Location.getCurrentPositionAsync();
        let cord = [ location.coords.latitude, location.coords.longitude ];
        return cord;
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

  const getBatteryLevel = async () => {
        const bat = await Battery.getBatteryLevelAsync();
        const percent = Math.round(bat * 100);
        return percent;
    }

  setInterval(addSelf, 60000);

  const addSelf = async () => {
        const bat = await getBatteryLevel();
        const cord = await getLocation();
        const location = await (await fetch("http://128.180.206.51:3000/api/getLocation", {
			headers: {
                'Content-Type': 'application/json'
            },
		})).json();
        let distance = Math.sqrt(Math.pow((cord[0] - location[0]), 2) + Math.pow((cord[1] - location[1]), 2));
		const nameNumber = await (await fetch("http://128.180.206.51:3000/api/getNameNumber", {
			headers: {
                'Content-Type': 'application/json'
            },
		})).json();
        await fetch("http://128.180.206.51:3000/api/update", {
            body: JSON.stringify({"device": Device.deviceName, "name": nameNumber[0], "distance": distance, "battery": bat, "number": nameNumber[1]}),
            method: "POST",
			headers: {
                'Content-Type': 'application/json'
            },
        });
    }


  //this function checks the location and battery of all friends
  async function checkFriends() {

    //TODO integrate this functionally into the app
    let distance = Math.sqrt(Math.pow((currentlocation[0] - friendlocation[0]), 2) + Math.pow((currentlocation[1] - friendlocation[1]), 2))
    //for loop to go through everyones location

  }

  useEffect(() => {
    addSelf()

    return () => clearInterval(interval);
  }, []);


  setInterval(checkFriends, 300000);


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  const getUsers = async () => {
     try {
      const response = await fetch('http://128.180.206.51:3000/api/getEveryone');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
 
  useEffect(() => {
    getUsers();
  }, []);
 
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>{Math.floor(100000 + Math.random() * 900000)}</Text>      
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.items}>{item.name}       {item.distance}ft        {item.battery}%</Text>
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
 
const styles = StyleSheet.create({
  items: {
    backgroundColor:'#FFF',
    padding: 0,
    margin: 1,
    fontSize: 24,
    height: 44,
    width: 300,
    textAlign: 'center',
  },
});
export default List;
