import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
const InfoUser = () => {
    const router = useRoute()
    const [name, setName] = useState(router.params.name)
    const [email, setEmail] = useState(router.params.email)
    const [modalVisible, setModalVisible] = useState(false);
    const formatDate = (data) => {
        const temp = new Date(data * 1000)
        const day = temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate();
        const month = (temp.getMonth() + 1) < 10 ? "0" + (temp.getMonth() + 1) : (temp.getMonth() + 1);
        const year = temp.getFullYear();
        const result = day + '/' + month + '/' + year
        return result
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Avatar
                size={120}
                rounded
                source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
                containerStyle={{ backgroundColor: 'grey', alignSelf: 'center', marginTop: 20, marginBottom: 10 }}
            >
                <Avatar.Accessory size={24} onPress={() => { console.log('click') }} />
            </Avatar>
            <TextInput value={name} placeholder='Nhập họ tên' onChangeText={setName} style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 16, fontSize: 18, borderColor: 'gray', marginVertical: 10, paddingLeft: 15 }} />
            <TextInput value={email} placeholder='Nhập email' onChangeText={setEmail} style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 16, fontSize: 18, borderColor: 'gray', marginVertical: 10, paddingLeft: 15 }} />
            <View style={{ height: 50, borderRadius: 10, marginHorizontal: 16, fontSize: 18, backgroundColor: 'gray', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 6 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>{formatDate(router.params.dateOfBirth.seconds)}</Text>
                <Icon name='calendar-outline' size={24} onPress={() => { setModalVisible(true) }} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <View style={{height:280}}>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 10 }}>Cập nhật ảnh</Text>
                        <Text style={{ fontSize: 14, alignSelf: 'center', marginTop: 4 }}>Chọn ảnh đại diện của bạn</Text>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius:10, marginHorizontal:16, alignItems:'center', justifyContent:'center', marginVertical:6}}>
                            <Text style={{color:'white'}}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius:10, marginHorizontal:16, alignItems:'center', justifyContent:'center', marginVertical:6}}>
                            <Text style={{color:'white'}}>Chọn ảnh từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius:10, marginHorizontal:16, alignItems:'center', justifyContent:'center', marginVertical:6}}>
                            <Text style={{color:'white'}}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InfoUser

const styles = StyleSheet.create({})