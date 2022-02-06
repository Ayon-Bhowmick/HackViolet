import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View } from 'react-native';

const List = () => {
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
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.items}>{item.name}   {item.distance}   {item.battery}</Text>
          )}
        />
      )}
    </View>

    
  );

  
};

const styles = StyleSheet.create({
  items: { 
    backgroundColor:'#FFF',
    padding: 0,
    margin: 1,
    fontSize: 36,
    height: 44,
    width: 300,
    textAlign: 'center',
  },
});
export default List;