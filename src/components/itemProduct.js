import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import NumberFormat from 'react-number-format';
const ItemProduct = ({item,topping,size}) => {
  const navigator=useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{navigator.push('Detail',{item:item,topping:topping,size:size})}}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.linkImage }} style={styles.img} />
      </View>
      <View style={styles.info}>
        <Text style={{fontWeight:'bold',marginBottom:4}} numberOfLines={1}>{item.name}</Text>
        <NumberFormat
        value={parseInt(item.price)}
        displayType="text"
        thousandSeparator
        suffix='đ'
        renderText={(value) => <Text>{value}</Text>}
      />
      </View>
    </TouchableOpacity>
  )
}

export default ItemProduct

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  imgContainer:{
    height: 120, 
    width: 120, 
    borderRadius: 10, 
    backgroundColor:'#F6F1E7',
    justifyContent:'center',
  },
  img: {
    height: 110, 
    width: 110, 
    alignSelf: 'center', 
  },
  info:{
    flexDirection:'column',
    flex:1,
    paddingLeft:10,
    paddingTop:10,
  }
})