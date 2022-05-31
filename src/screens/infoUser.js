import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import fireauth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
const InfoUser = () => {
    const navigation=useNavigation()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [image, setImage] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const openCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            cropperCircleOverlay: true
        }).then(image => {
            setImage(image.path)
            setModalVisible(false)
        }).catch((e) => { }
        );
    }
    const openGalery = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            cropping: true,
            cropperCircleOverlay: true
        }).then((image) => {
            setImage(image.path)
        }).catch((e) => { }

        );
    }
    const update = async () => {
        const uri = image;
        try {
            await storage().ref(fireauth().currentUser.uid).putFile(uri)
        } catch (e) {
            console.log(e)
        }
        await firestore()
            .collection('Users')
            .doc(fireauth().currentUser.uid)
            .update({
                name:name,
                email:email,
                avatar:await storage().ref(fireauth().currentUser.uid).getDownloadURL()
            })
            .then(() => {
                console.log('User updated!');
            });
    }
    const formatDate = (data) => {
        const temp = new Date(data * 1000)
        const day = temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate();
        const month = (temp.getMonth() + 1) < 10 ? "0" + (temp.getMonth() + 1) : (temp.getMonth() + 1);
        const year = temp.getFullYear();
        const result = day + '/' + month + '/' + year
        return result
    }
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [user,setUser]=useState()
    const getInfoUser=async()=>{
    const temp = await firestore().collection('Users').doc(fireauth().currentUser.uid).get();
    return temp.data()
  }
  const setInfo=async()=>{
    const data=await getInfoUser()
    setUser(data)
    setImage(data.avatar)
    setName(data.name)
    setEmail(data.email)
    setLoading(false)
  }
  useEffect(()=>{
    setInfo()
  },[])
  if (loading) {
    return <ActivityIndicator />;
  }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Avatar
                size={120}
                rounded
                source={{ uri: image == '' ? 'http://danhgia.snv.kontum.gov.vn/Images/no-avatar.png' : image }}
                containerStyle={{ backgroundColor: 'grey', alignSelf: 'center', marginTop: 20, marginBottom: 10 }}
            >
                <Avatar.Accessory size={24} onPress={() => { setModalVisible(true) }} />
            </Avatar>
            <TextInput value={name} placeholder='Nhập họ tên' onChangeText={setName} style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 16, fontSize: 18, borderColor: 'gray', marginVertical: 10, paddingLeft: 15 }} />
            <TextInput value={email} placeholder='Nhập email' onChangeText={setEmail} style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 16, fontSize: 18, borderColor: 'gray', marginVertical: 10, paddingLeft: 15 }} />
            <View style={{ height: 50, borderRadius: 10, marginHorizontal: 16, fontSize: 18, backgroundColor: 'gray', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 6 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>{formatDate(user.dateOfBirth.seconds)}</Text>
                <Icon name='calendar-outline' size={24} />
            </View>
            <View style={{ height: 50, borderRadius: 10, marginHorizontal: 16, fontSize: 18, backgroundColor: 'gray', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 6 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>{user.gender}</Text>
            </View>
            <TouchableOpacity style={{ marginTop: 150, height: 50, backgroundColor: COLORS.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { update() }}>
                <Text style={{ color: 'white' }}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <View style={{ height: 280, backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 10 }}>Cập nhật ảnh</Text>
                        <Text style={{ fontSize: 14, alignSelf: 'center', marginTop: 4 }}>Chọn ảnh đại diện của bạn</Text>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { openCamera() }}>
                            <Text style={{ color: 'white' }}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { openGalery() }}>
                            <Text style={{ color: 'white' }}>Chọn ảnh từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: COLORS.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { setModalVisible(false) }}>
                            <Text style={{ color: 'white' }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InfoUser

const styles = StyleSheet.create({})