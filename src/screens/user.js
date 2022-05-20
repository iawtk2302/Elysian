import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'

const User = () => {
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <TouchableOpacity style={{height: 50, alignSelf: 'center', justifyContent: 'center', backgroundColor: 'red'}} onPress={signOut}>
        <Text> Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User

const styles = StyleSheet.create({})