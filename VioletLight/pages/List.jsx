import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Button, Alert, FlatList, Text, View ,TouchableOpacity} from 'react-native';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const List = () => {
	const [name, setName] = useState(async () => {getName});
	const [number, setNumber] = useState(async () => {getPhone});
	const [loca, setLoca] = useState(async () => {fetch("http://128.180.206.51:3000/api/getLocation")});

	const getPhone = async () => {
		const phone = await (await fetch("http://128.180.206.51:3000/api/getNumber", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"device": Device.deviceName})
		})).json();
		return phone;
	}

	const getName = async () => {
		const name = await (await fetch("http://128.180.206.51:3000/api/getName", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"device": Device.deviceName})
		})).json();
		return name;
	}

  const alertFunction = async () => {

    //put the whole thing in a for loop and send to each person

    //console log that the alert was activated
    console.log("ALERT ACTIVATED")

    //get the name of the person sending the alert
    let sendtxt ={
      message: {
        to: '4248858411',
        body: 'An EMERGENCY ALERT has been sent!!! Please go to your safe location'
      },
	  submitting: false,
	  error: false
    };

    await fetch('http://128.180.206.51:3000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendtxt.message),
    })
      .then(res => res.json())
      .then(data => {
        //just reset this.state to blank
        if (data.success) {
			console.log("it was successful")
			error = false;
			submitting = true;
        } else {
          console.log("There was an error");
		  error = true;
		  submitting = false;
        }
      })
  }

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

  const addSelf = async () => {
        const bat = await getBatteryLevel();
        const cord = await getLocation();
        // const location = (await fetch("http://128.180.206.51:3000/api/getLocation"));
        const distance = Math.sqrt(Math.pow((cord[0] - loca[0]), 2) + Math.pow((cord[1] - loca[1]), 2));
		// const nameNumber = (await fetch("http://128.180.206.51:3000/api/getNameNumber"));
        await fetch("http://128.180.206.51:3000/api/update", {
            body: JSON.stringify({"device": Device.deviceName, "name": name, "distance": distance, "battery": bat, "number": number}),
            method: "POST",
			headers: {
                'Content-Type': 'application/json'
            },
        });
		console.log("added self");
    }

//   useEffect(() => {
// 	const interval = setInterval(() => {addSelf(); getUsers(); console.log("has run");}, 10000);
// 	return () => clearInterval(interval);
//   }, []);

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
    <>
    <Text style={styles.header}>VioletLight</Text>
    <View style={{ flex: 1, padding: 24 , top: 30}}>
      
      <Text style={styles.numID}>ID: {Math.floor(100000 + Math.random() * 900000)}</Text>      
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text key={item.name} style={styles.items}>{item.name}       {item.distance}ft        {item.battery}%</Text>
          )}
        />
      )}


    <TouchableOpacity style={styles.alertbtn}  onPress={() => alert('Button Tapped')} // generic alert
        onPress={() => Alert.alert("Are you sure you want to send alert?", " ", [
          { text: "No", onPress: () => console.log("No") },
          { text: "Yes", onPress: () => { alertFunction() } },
        ])} title="Create Group">
                        <Text style={styles.textBtn}>ALERT</Text>
    </TouchableOpacity>

        {/* <Button
        color="red"
        title="boobs"
        
        // onPress={() => alert('Button Tapped')} // generic alert
        onPress={() => Alert.alert("Are you sure you want to send alert?", " ", [
          { text: "No", onPress: () => console.log("No") },
          { text: "Yes", onPress: () => { alertFunction() } },
        ])}

      /> */}
    </View>
    </>
 
  );
 
};
 
const styles = StyleSheet.create({
  numID: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',

  },
  items: {
    backgroundColor:'#FFF',
    padding: 5,
    margin: 1,
    fontSize: 24,
    height: 44,
    width: 300,
    textAlign: 'center',
    
  },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(220, 157, 250)'

    },

    alertbtn: {
      backgroundColor: 'red',
      bottom: 100,
      left: 50,
      width: 170,
      height: 80,
      borderRadius:10

    },

    textBtn: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF',
      textAlign: 'center',
      top: 20

    }
});
export default List;
