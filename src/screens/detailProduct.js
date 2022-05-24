import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import NumberFormat from 'react-number-format'
import Icon from 'react-native-vector-icons/Ionicons'
import ButtonGroup from '../components/buttonGroup'
import COLOR from '../common/Color'
import SelectMultiple from 'react-native-select-multiple'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/orderSlice'
const DetailProduct = () => {
    const router = useRoute();
    const navigation=useNavigation();
    const [size, setSize] = useState(router.params.size[0]);
    const [price, setPrice] = useState(router.params.item.price);
    const [count, setCount] = useState(1);
    const [selectedTopping, setselectedTopping] = useState([])
    const total= (parseInt(size.price)+parseInt(price)+ selectedTopping.reduce((total,currentValue)=>total+parseInt(currentValue.value.price),0))*count
    const topping = router.params.topping.map((e) => {
        return {
            label: { name: e.name, price: e.price },
            value: e
        }
    })
    const dispatch=useDispatch();
    const handleSummit=()=>{
        const value={
            product:router.params.item,
            size:size,
            topping:[...selectedTopping.map((e)=>{return{...e.value}})],
            count:count,
            total:total
        }
        const action=addProduct(value);
        dispatch(action);
        navigation.navigate("Order")
    }
    const onSelectionsChange = (selectedFruits) => {
        setselectedTopping(selectedFruits)
    }
    const increaseCount = () => {
        setCount(count + 1)
    }
    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const renderLabel = (label, style) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 300, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16 }}>{label.name}</Text>
                <NumberFormat
                    value={parseInt(label.price)}
                    displayType="text"
                    thousandSeparator
                    suffix='đ'
                    renderText={(value) => <Text>{value}</Text>}
                />
            </View>
        )
    }
    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
            <View >
                <View style={styles.imgContainer}>
                    <Image source={{ uri: router.params.item.linkImage }} style={styles.img} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', backgroundColor:'white' }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{router.params.item.name}</Text>
                        <NumberFormat
                            value={parseInt(router.params.item.price)}
                            displayType="text"
                            thousandSeparator
                            suffix='đ'
                            renderText={(value) => <Text style={{ fontSize: 16 }}>{value}</Text>}
                        />
                    </View>
                    <Icon name='heart-outline' size={24} />
                </View>
                <View style={{ paddingHorizontal: 16, marginTop:20, backgroundColor:'white'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop:10 }}>Size</Text>
                    <Text>Chọn 1 loại size</Text>
                    <ButtonGroup size={router.params.size} item={router.params.item} onSelect={setSize} />
                </View>
                <View style={{ height: 380, backgroundColor:'white', marginTop:20, paddingHorizontal:16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop:10 }}>Topping</Text>
                    <Text>Chọn tối đa 2 loại</Text>
                    <SelectMultiple
                        renderLabel={renderLabel}
                        items={topping}
                        selectedItems={selectedTopping}
                        onSelectionsChange={onSelectionsChange}
                        maxSelect={2} />
                </View>
                <View style={{height:130}}/>
            </View>
        </ScrollView>
        <View style={{ height:'15%', position:'absolute', bottom: 0, width:'100%', backgroundColor:'white' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 110, flex: 0.5 }}>
                    <Icon name='remove-circle-outline' size={32} color={count > 1 ? COLOR.custom : 'gray'} onPress={() => decreaseCount()} />
                    <Text style={{ fontSize: 24, fontWeight: '600', color: COLOR.custom }}>{count}</Text>
                    <Icon name='add-circle-outline' size={32} color={COLOR.custom} onPress={() => increaseCount()} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: COLOR.custom, height: 45, marginHorizontal: 16, justifyContent: 'center', alignItems: 'center' }} onPress={handleSummit}>
                        <NumberFormat
                            value={total}
                            displayType="text"
                            thousandSeparator
                            suffix='đ'
                            renderText={(value) => <Text style={{ color: 'white' }}>Thêm vào giỏ : {value}</Text>}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5F5F5'
    },
    imgContainer: {
        height: 200,
        backgroundColor: '#F6F1E7',
        justifyContent: 'center',
    },
    img: {
        height: 180,
        width: 180,
        alignSelf: 'center',
    },
})