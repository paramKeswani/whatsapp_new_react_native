import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDocument = await firestore().collection('users').doc(user.uid).get();
        if (userDocument.exists) {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('Detail', { uid: user.uid });
        }
      }
    };
    checkUser();
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDocument = await firestore().collection('users').doc(user.uid).get();
      setLoading(false);
      if (userDocument.exists) {
        Alert.alert('Login Successful');
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Successful');
        navigation.navigate('Detail', { uid: user.uid });
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      Alert.alert('Login Unsuccessful', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
});

export default Login;
