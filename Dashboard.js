import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from 'react-native-vector-icons';

export default function Dashboard({ route }) {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const userData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    const fetchUserName = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDocument = await firestore().collection('users').doc(currentUser.uid).get();
          const userData = userDocument.data();
          setUserName(userData?.name || '');
        }
      } catch (error) {
        console.log('Error fetching user name:', error);
      }
    };

    if (isFocused) {
      fetchUsers();
      fetchUserName();
    }
  }, [isFocused]);

  const navigateToChat = (userId, userName, userEmail) => {
    navigation.navigate('ChatScreen', {
      userId,
      userName,
      userEmail,
    });
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

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
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToChat(item.id, item.name, item.email)} style={[styles.userContainer,{height:90}]}>
              <LinearGradient colors={['rgba(128,128,128,0)', 'rgba(128,128,128,0)']} style={styles.userGradient}>
                <View style={[styles.circle,{paddingBottom:10}]} />
                <View style={{marginBottom:10}}>
                <Text style={[styles.userName,{paddingTop:5}]}>{item.name}</Text>
                <Text style={{ marginBottom: 15, fontSize: 15 }}>Hello Programmer How are You ?</Text>


                </View>
                
                <View style={{paddingBottom:10}}>
                 <Text style={{marginRight:10}}>12.15</Text>
                 <View style={[styles.smallcircle,{color:"green"}]}>

                 <Text style={[{ color:"white"}]} >2</Text>
                 </View>
                 </View>
                

              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
        <MaterialCommunityIcons name="android-messages" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075e54',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#075e54',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
  },
  smallcircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#25d366',
    justifyContent: 'center', // Align text vertically
    alignItems: 'center'

  },
  icon: {
    marginLeft: 10,
  },
});
