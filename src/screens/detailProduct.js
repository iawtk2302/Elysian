import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import React,{useState} from 'react'
import { useRoute } from '@react-navigation/native'
import NumberFormat from 'react-number-format'
import Icon from 'react-native-vector-icons/Ionicons'

const DetailProduct = () => {
    const router = useRoute();
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: router.params.item.linkImage }} style={styles.img} />
                </View>
                <View style={{ flexDirection: 'row',justifyContent:'space-between',paddingHorizontal:16, paddingVertical:10,alignItems:'center'}}>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>{router.params.item.name}</Text>
                        <NumberFormat
                            value={parseInt(router.params.item.price)}
                            displayType="text"
                            thousandSeparator
                            suffix='đ'
                            renderText={(value) => <Text style={{fontSize:16}}>{value}</Text>}
                        />
                    </View>
                    <Icon name='heart-outline' size={24}/>
                </View>
                <View style={{paddingHorizontal:16}}>
                    <Text style={{fontWeight:'bold', fontSize:18}}>Size</Text>
                    <Text>Chọn 1 loại size</Text>
                </View>
            </ScrollView>
            <Button title='Đặt hàng' onPress={() => { console.log(router.params); }} />
        </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        height: 200,
        borderRadius: 10,
        backgroundColor: '#F6F1E7',
        justifyContent: 'center',
    },
    img: {
        height: 180,
        width: 180,
        alignSelf: 'center',
    },
})