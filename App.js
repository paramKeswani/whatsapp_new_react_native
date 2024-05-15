import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Head from "./head";

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";


import AppNavigator from "./Navigation"; 


export default function App() {
  return (
    <NavigationContainer>
      
        <StatusBar backgroundColor = '#0e806a' barStyle = 'light-content'/>



      <View style = {styles.container}>
        <StatusBar backgroundColor = '#0e806a' barStyle = 'light-content'/>
        <Head/>

        <View style = {{ flex: 1, backgroundColor: 'white'}}>
        <AppNavigator/>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


