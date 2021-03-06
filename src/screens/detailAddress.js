import { StyleSheet, Text, View, TextInput, Switch, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../common/Color'
import axios from 'axios'
import firestore from '@react-native-firebase/firestore'
import fireauth from '@react-native-firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native';
const DetailAddress = () => {
    const router = useRoute()
    const navigation = useNavigation()
    const [open, setOpen] = useState(false);
    const [province, setProvince] = useState(router.params.province);
    const [items, setItems] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [district, setDistrict] = useState(router.params.district);
    const [items1, setItems1] = useState([]);
    const [open2, setOpen2] = useState(false);
    const [ward, setWard] = useState(router.params.ward);
    const [items2, setItems2] = useState([]);
    const [data, setData] = useState([])
    const [checkName, setCheckName] = useState(true)
    const [checkPhone, setCheckPhone] = useState(true)
    const [checkAddress, setCheckAddress] = useState(true)
    const [name, setName] = useState(router.params.name)
    const [phone, setPhone] = useState(router.params.phone)
    const [isEnabled, setIsEnabled] = useState(false)
    const [isComplete, setIsComplete] = useState(true)
    const [isChange, setIsChange] = useState(false)
    const [isDetailAddress, setIsDetailAddress] = useState(true)
    const [detailAddress, setDetailAddress] = useState(router.params.detail)
    const [isSubmit, setIsSubmit] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const getData = () => {
        axios.get(`https://provinces.open-api.vn/api/?depth=3`)
            .then(res => {
                const location = res.data;
                setData(res.data)
                setItems(location.map((e) => { return { label: e.name, value: e.name } }))
                res.data.forEach((e) => {
                    if (e.name == province) {
                        setItems1(e.districts.map((e) => { return { label: e.name, value: e.name } }))
                    }
                })
                res.data.forEach((e) => {
                    if (e.name == province) {
                        e.districts.forEach((e) => {
                            if (e.name == district) {
                                setItems2(e.wards.map((e) => { return { label: e.name, value: e.name } }))
                            }
                        })
                    }
                })
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getData()
        return () => { }
    }, [])
    useEffect(() => {
        data.forEach((e) => {
            if (e.name == province) {
                setItems1(e.districts.map((e) => { return { label: e.name, value: e.name } }))
                setItems2([])
                setDistrict(null)
                setWard(null)
            }
        })
        return () => { }
    }, [province])
    useEffect(() => {
        data.forEach((e) => {
            if (e.name == province) {
                e.districts.forEach((e) => {
                    if (e.name == district) {
                        setItems2(e.wards.map((e) => { return { label: e.name, value: e.name } }))
                        setWard(null)
                    }
                })
            }
        })
        return () => { }
    }, [district])
    useEffect(() => {
        if (province != null && district != null && ward != null)
            setIsDetailAddress(true)
        else {
            setDetailAddress('')
            setIsDetailAddress(false)
        }
        return () => { }
    }, [province, district, ward])
    useEffect(() => {
        if (isDetailAddress && detailAddress != '')
            setCheckAddress(true)
        else
            setCheckAddress(false)
        return () => { }
    }, [detailAddress])
    useEffect(() => {
        if (checkName && checkPhone && checkAddress)
            setIsComplete(true)
        else
            setIsComplete(false)
        return () => { }
    }, [checkAddress, checkName, checkPhone])
    useEffect(() => {
        if (isChange && isComplete)
            setIsSubmit(true)
        else
            setIsSubmit(false)
        return () => { }
    }, [isChange, isComplete])
    useEffect(() => {
        if (!router.params.selected) {
            if (name != router.params.name || phone != router.params.phone || province != router.params.province || district != router.params.district || ward != router.params.ward || detailAddress != router.params.detail || isEnabled != router.params.selected)
                setIsChange(true)
            else
                setIsChange(false)
        }
        else {
            if (name != router.params.name || phone != router.params.phone || province != router.params.province || district != router.params.district || ward != router.params.ward || detailAddress != router.params.detail)
                setIsChange(true)
            else
                setIsChange(false)
        }
        return () => { }
    }, [name, phone, province, district, ward, detailAddress, isEnabled])
    const removeAscent = (str) => {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
        str = str.replace(/??|??|???|???|??/g, "i");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
        str = str.replace(/???|??|???|???|???/g, "y");
        str = str.replace(/??/g, "d");
        return str;
    }
    const validateName = (name) => {
        let regex = /^[a-zA-Z ]{2,}$/g
        if (regex.test(removeAscent(name))) {
            setCheckName(true)
        }
        else {
            setCheckName(false)
        }
    }
    const validatePhone = (phone) => {
        let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (regex.test(phone)) {
            setCheckPhone(true)
        }
        else {
            setCheckPhone(false)
        }
    }
    const onSubmit = async () => {
        if (!router.params.selected) {
            if (isEnabled) {
                await firestore()
                    .collection('Addresses')
                    .where('userID', '==', fireauth().currentUser.uid)
                    .get()
                    .then((QuerySnapshot) => {
                        QuerySnapshot.forEach((e) => {
                            e.ref.update({
                                selected: false
                            })
                        })
                    });
            }
            await firestore()
                .collection('Addresses')
                .doc(router.params.idAddress)
                .update({
                    name: name,
                    phone: phone,
                    province: province,
                    district: district,
                    ward: ward,
                    detail: detailAddress,
                    selected: isEnabled
                })
                .then(() => {
                    navigation.goBack()
                });
        }
        else {
            await firestore()
                .collection('Addresses')
                .doc(router.params.idAddress)
                .update({
                    name: name,
                    phone: phone,
                    province: province,
                    district: district,
                    ward: ward,
                    detail: detailAddress,
                })
                .then(() => {
                    navigation.goBack()
                });
        }
    }
    const deleteLocation = async () => {
      await firestore()
            .collection('Addresses')
            .doc(router.params.idAddress)
            .delete()
            .then(() => {
                navigation.goBack()
            });
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ margin: 16 }}>Li??n h???</Text>
            <TextInput placeholder='H??? v?? t??n' value={name} style={{ paddingLeft: 10, backgroundColor: 'white' }} onChangeText={(text) => { validateName(text), setName(text) }} />
            {
                (!checkName && name != '') && <View style={{ paddingLeft: 10, backgroundColor: '#FFF4F3', height: 30, justifyContent: 'center' }}>
                    <Text style={{ color: '#D9415D' }}>H??? v?? t??n kh??ng h???p l??? !</Text>
                </View>
            }
            <TextInput placeholder='S??? ??i???n tho???i' value={phone} style={{ paddingLeft: 10, backgroundColor: 'white' }} keyboardType='phone-pad' maxLength={10} onChangeText={(text) => { validatePhone(text), setPhone(text) }} />
            {
                (!checkPhone && phone != '') && <View style={{ paddingLeft: 10, backgroundColor: '#FFF4F3', height: 30, justifyContent: 'center' }}>
                    <Text style={{ color: '#D9415D' }}>S??? ??i???n tho???i kh??ng h???p l??? !</Text>
                </View>
            }
            <Text style={{ margin: 16 }}>?????a ch???</Text>
            <DropDownPicker
                style={{ borderWidth: 0 }}
                placeholder='Ch???n t???nh/th??nh ph???'
                zIndex={10}
                open={open}
                value={province}
                items={items}
                setOpen={setOpen}
                setValue={setProvince}
                setItems={setItems}
            />
            <DropDownPicker
                style={{ borderWidth: 0 }}
                placeholder='Ch???n qu???n/huy???n'
                zIndex={5}
                open={open1}
                value={district}
                items={items1}
                setOpen={setOpen1}
                setValue={setDistrict}
                setItems={setItems1}
            />
            <DropDownPicker
                style={{ borderWidth: 0 }}
                placeholder='Ch???n ph?????ng/x??'
                zIndex={3}
                open={open2}
                value={ward}
                items={items2}
                setOpen={setOpen2}
                setValue={setWard}
                setItems={setItems2}
            />
            <TextInput placeholder='T??n ???????ng, T??a nh??, S??? nh??.' value={detailAddress} style={{ paddingLeft: 10, backgroundColor: 'white' }} editable={isDetailAddress} onChangeText={setDetailAddress} />

            {
                !router.params.selected && <View>
                    <Text style={{ margin: 16 }}>C??i ?????t</Text>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 45 }}>
                        <Text style={{ color: 'black', marginLeft: 10 }}>?????t l??m ?????a ch??? m???c ?????nh</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: COLORS.backgroundWeak }}
                            thumbColor={isEnabled ? COLORS.custom : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            }
            <View style={{ height: 40 }} />
            <TouchableOpacity style={{ height: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} activeOpacity={1} onPress={deleteLocation}>
                <Text style={{ color: COLORS.custom }}>X??a ?????a ch???</Text>
            </TouchableOpacity>
            <Button title='C???p nh???t th??ng tin' disabled={!isSubmit} color={COLORS.custom} onPress={onSubmit} />
        </View>
    )
}

export default DetailAddress

const styles = StyleSheet.create({})