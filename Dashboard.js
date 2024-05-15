import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

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
        <Button title="Home"  color="#0e806a" onPress={ () =>navigation.navigate('Dashboard')} style={[styles.headerTitle,{ width: 400 }]} />
        <Button title="Status"  color="#0e806a" onPress={ () =>navigation.navigate('Status')} style={styles.headerTitle} />
        <Button title="Profile"  color="#0e806a"  onPress={ () =>navigation.navigate('Dashboard')} style={styles.headerTitle} />
        <View style={styles.headerContent}>
        
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToChat(item.id, item.name, item.email)}
              style={styles.userContainer}
            >
              <LinearGradient colors={['rgba(128,128,128,0)', 'rgba(128,128,128,0)']} style={styles.userGradient}>
                <View style={styles.circle} />
                <Text style={styles.userName}>{item.name}</Text>
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
  },
  headerTitle: {
    
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
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    margin: 10,
  },
  logoutText: {
    fontSize: 10,
    color: '#43A047',
    margin: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    padding: 5,
    position: 'absolute',
    top: '7%',
    left: 0,
    right: 0,
    bottom: 0,
  },
  userContainer: {
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  userGradient: {
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
    backgroundColor: "grey",
  },
  whiteLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'white',
  },
});