import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { Feather, Fontisto, MaterialCommunityIcons } from 'react-native-vector-icons';

const Head = () => {
  return (
    <View style = {styles.container}>
      <View style = {styles.headerContainer}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 ,color:"white" }}>WhatsApp</Text>

        <View style = {styles.iconContainer}>
    
            <Fontisto name = 'search' size = {20} color = 'white' style = {styles.icon} />
            <MaterialCommunityIcons name = 'dots-vertical' size = {21} color = 'white' style = {styles.icon}/>
        </View>
      </View>
    </View>
  )
}

export default Head

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#075e54',
    paddingTop: 80,
    paddingBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16
  },
  headerText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 20
  }
});