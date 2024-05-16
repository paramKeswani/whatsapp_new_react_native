import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

export default function Detail({ route, navigation }) {
  const { uid } = route.params;
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('Male');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = storage().ref(`images/${uid}`);
    await storageRef.put(blob);
    const downloadURL = await storageRef.getDownloadURL();

    return downloadURL;
  };

  const saveDetails = async () => {
    try {
      const imageUrl = await uploadImage();

      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          name,
          dob: dob.toISOString().slice(0, 10),
          gender,
          displayName: name,
          imageUrl,
        });

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('Error saving details:', error);
      Alert.alert('Error', 'Failed to save details.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Enter your Details:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
        />
        <DatePicker
          style={styles.datePicker}
          date={dob}
          onDateChange={setDob}
          mode="date"
        />
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          <Text style={styles.imagePickerButtonText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveDetails} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#ADD8E4',
    padding: 20,
    borderTopLeftRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
    color: '#fff',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#fff',
  },
  datePicker: {
    height: 80,
    width: Dimensions.get('window').width - 40,
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 30,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#0078FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: '#0078FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});