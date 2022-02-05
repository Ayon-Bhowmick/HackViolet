import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Platform, SafeAreaProvider} from "react-native";

const userList = [
  {id: 1, name: 'Black Panter'},
  {id: 2, name: 'Black Widow'},
  {id: 3, name: 'Captain America'},
  {id: 4, name: 'The Collector'},
  ];

  const myKeyExtractor = (item) => {
    return item.id
  }
  
  const renderItem = ({item}) => {
    return <View><Text>{item.name}</Text></View>
  }
  
  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Marvel list
        </Text>
      </View>
    )
  }
  
  const Footer = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Thanks for reading!
        </Text>
      </View>
    )
  }
  
  const List = () => {
      const [refreshing, setRefreshing] = React.useState(false)
  
      const handleRefresh = () => {
        setRefreshing(prevState => !prevState)
      }
  
        return (
          <SafeAreaView style={styles.separateHero}>
            <Header />
            <FlatList
              data={userList}
              renderItem={renderItem}
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                 (({ highlighted }) => (
                   <View
                      style={
                         styles.separator
               }
                  />
                ))
              }
              keyExtractor={myKeyExtractor}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
            <Footer />
          </SafeAreaView>
          )
      }
  
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: '#ff0000',
    },
    separateHero: {
      height: '100vh' 
  },
      header: {
        backgroundColor: 'red',
        width: '100vw',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
      },
      headerText: {
        color: '#fff',
        fontSize: 18
      },
      footer: {
        backgroundColor: 'white',
        width: '100vw',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
      },
      footerText: {
        color: '#000',
        fontSize: 18
      }
  });
  
  
  export default List
  