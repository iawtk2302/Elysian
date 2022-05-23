import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../common/Color'
import Icon from 'react-native-vector-icons/Ionicons'
const HeaderOrder = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white',fontSize:20, fontWeight:'bold'}}>Order</Text>
            <Icon name='heart-outline' size={26} color='white'/>
        </View>
    )
}

export default HeaderOrder

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.custom,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16
    }
})