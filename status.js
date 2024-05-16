import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import STATUSDATA from './statusdata';
import { FontAwesome5 } from 'react-native-vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Login from './Login';
import auth from '@react-native-firebase/auth';
import { Feather, Fontisto, MaterialCommunityIcons } from 'react-native-vector-icons';


const Status = () => {

  const navigation  = useNavigation();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };
  const [statusData, setStatusData] = useState(STATUSDATA);
  

  useEffect(() => {
    setStatusData(STATUSDATA);
  }, []);

  const combinedStatusData = [
    { 'title': 'Recent updates', data: statusData.filter(item => item.viewed === false) },
    { 'title': 'Viewed updates', data: statusData.filter(item => item.viewed === true) },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Feather name="camera" size={20} color="white" style={styles.icon} />
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={[styles.headerTitle, {paddingLeft:30 ,flex:1,flexDirection:"row", justifyContent: 'space-between',}]}>
          <Text style={styles.headerText}>Chat </Text>
          <View style={[styles.smallcircle,{backgroundColor:"white"}]}><Text style={[{ color:"#0e806a"}]} >10</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Status')} style={[styles.headerTitle ,{paddingLeft :12}]}>
          <Text style={styles.headerText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.headerTitle ,{paddingLeft :12}] }>
          <Text style={styles.headerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={[styles.headerTitle ,{paddingLeft :28}  ]}>
          <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.myStatusContainer , padding= 30]}>
        <View>
          {/* Add your image component here */}
        </View>

      </View>

      <FlatList
        data={combinedStatusData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.viewedStatus}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.viewedStatusContainer}>
                  <View>
                    {/* Add your image component here */}
                  </View>
                  <View style={styles.circle} />
                  <View style={{paddingLeft:10}}>
                    <Text style={styles.myStatusHeading}>{item.name}</Text>
                    <Text style={styles.myStatusSubtext}>{item.time}</Text>
                  </View>
                </View>
              )}
            />
          </>
        )}
      />
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => ('#')}
      >
        <FontAwesome5 name='pen' size={18} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => ('#')}
      >
        <FontAwesome5 name='camera' size={20} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#0e806a',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '10%',
    justifyContent: 'center',
    flexDirection: 'row',
    width :400,
    height:45,
  },headerTitle: {
    
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#43A047'

  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  myStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  },
  myStatusHeading: {
    fontSize: 16,
    fontWeight: '600'
  },
  myStatusSubtext: {
    fontSize: 14,
    color: 'grey'
  },
  viewedStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
    marginTop: 5,
    marginLeft: 16,
    marginBottom: 5
  },
  viewedStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  writeButton: {
    position: 'absolute',
    bottom: 100,
    right: 28,
    backgroundColor: '#e8e8e8',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#0e806a',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#43A047'
  },  logoutText: {
    fontSize: 10,
    color: '#43A047',
    margin: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e806a',
    paddingVertical: 10,
    
  },
  headerTitle: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    paddingTop: 5,
  },
  userContainer: {
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  userGradient: {
    flex:1,
    flexDirection :"row",
    justifyContent: 'space-between',


    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingRight:100,
    paddingBottom:20,
  },
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#0e806a',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  smallcircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: 'lightgreen',
    justifyContent: 'center', // Align text vertically
    alignItems: 'center'

  },
  icon: {
    marginLeft: 10,
  },
});