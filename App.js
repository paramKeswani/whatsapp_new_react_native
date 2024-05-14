import "react-native-gesture-handler";
import Head from "./Head";

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";


import AppNavigator from "./Navigation"; 


export default function App() {
  return (
    <NavigationContainer>
    <Head/>
    <AppNavigator/>
    </NavigationContainer>
  );
}

