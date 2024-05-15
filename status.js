import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import STATUSDATA from './statusdata';
import { FontAwesome5 } from 'react-native-vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Status = () => {
  const [statusData, setStatusData] = useState(STATUSDATA);
  const navigation = useNavigation();

  useEffect(() => {
    setStatusData(STATUSDATA);
  }, []);

  const combinedStatusData = [
    { 'title': 'Recent updates', data: statusData.filter(item => item.viewed === false) },
    { 'title': 'Viewed updates', data: statusData.filter(item => item.viewed === true) },
  ];

  return (
    <View style={styles.container}>
    <View style = {backgroundColor="#0e806a"} >
    <View style={[styles.headerContainer ] }>
        <Button title="Home" color="#0e806a" onPress={() => navigation.navigate('Dashboard')} style={[styles.headerTitle]} />
        <Button title="Status" color="#0e806a" onPress={() => navigation.navigate('Status')} style={styles.headerTitle} />
        <Button title="Profile" color="#0e806a" onPress={() => navigation.navigate('Dashboard')} style={styles.headerTitle} />
      </View>
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
                  <View>
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
    width : 400,
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
  }
});