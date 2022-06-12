import {Text, View, TouchableOpacity, Switch} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/View.Payment.container';
import COLORS from '../common/Color';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectedAddress,
  selectTimePicker,
  setChecked,
  setModalTime,
} from '../redux/addressSlice';

const AddressPayment = () => {
  let address = useSelector(selectedAddress);
  return (
    <View style={[styles.aroundContainer]}>
      <Header />
      {address === '' ? (
        <NothingToShow />
      ) : (
        <View>
          <BodyAddress address={address} />
          <BodyUser address={address} />
        </View>
      )}
      <Bot />
    </View>
  );
};


const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Giao hàng tận nơi</Text>
      <TouchableOpacity>
        <View style={styles.btnContainer}>
          <Text style={{color: COLORS.custom}}>Thay Đổi</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Bot = () => {
  const dispatch = useDispatch();
  const isEnabled = useSelector(state => state.address.checked);
  const toggleSwitch = () => dispatch(setChecked());

  return (
    <View style={[styles.addressContain]}>
      <Text>Lưu thông tin giao hàng cho lần sau</Text>
      <Switch
        trackColor={{false: COLORS.gray, true: COLORS.backgroundWeak}}
        thumbColor={COLORS.custom}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const BodyAddress = ({address}) => {
  const navigation = useNavigation();

  const NavMoreAddresses = () => {
    navigation.push('MoreAddresses');
  };
  return (
    <TouchableOpacity
      onPress={NavMoreAddresses}
      style={{
        flexDirection: 'row',
        flex: 1,
      }}>
      <View style={{flex: 7}}>
        <Text style={[styles.bold, {fontSize: 18}]}>{address.detail}</Text>
        {address == '' ? (
          <Text>loading...</Text>
        ) : (
          <Text>
            {address.detail +
              ', ' +
              address.ward +
              ', ' +
              address.district +
              ', ' +
              address.province}
          </Text>
        )}
      </View>
      <View style={{justifyContent: 'center'}}>
        <Ionicons name="chevron-forward-outline" style={{fontSize: 20}} />
      </View>
    </TouchableOpacity>
  );
};

const BodyUser = ({address}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, color: 'black'}}>{address.name}</Text>
        <Text>{address.phone}</Text>
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: 'black',
          height: '60%',
          alignSelf: 'center',
        }}
      />
      <BtnChooseTime />
    </View>
  );
};

const BtnChooseTime = () => {
  const dispatch = useDispatch();
  const timePicker = useSelector(selectTimePicker);

  const getDateMonth = () => {
    return `Ngày ${timePicker.getDate()}, Tháng ${timePicker.getMonth()}`;
  };
  const getHoursMinutes = () => {
    return `${timePicker.getHours()} giờ ${timePicker.getMinutes()} phút`;
  };

  return (
    <TouchableOpacity
      style={{padding: 20, paddingEnd: 0}}
      onPress={() => dispatch(setModalTime())}>
      <Text>
        {timePicker == null ? '15-30 phút' : getHoursMinutes()} {'\n'}
        <Text style={{fontSize: 18, color: 'black'}}>
          {timePicker === null ? 'Càng sớm càng tốt' : getDateMonth()}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const NothingToShow = () => {
  const navigation = useNavigation();

  const openMoreAddress = () => {
    navigation.push('MoreAddresses');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
      }}>
      <TouchableOpacity alignSelf="center" onPress={openMoreAddress}>
        <Text style={{color: COLORS.custom}}>
          Vui lòng chọn địa chỉ giao hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressPayment;
