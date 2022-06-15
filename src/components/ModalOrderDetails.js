import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectModal, openOrClose} from '../redux/orderDetailSlide';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import {selectAllProduct} from '../redux/orderDetailSlide';
import OrderDetail from './OrderDetail';
import HistoryOrder from './HistoryOrder';
import Loading from './Loading';

export default ModalOrderDetails = () => {
  const modalVisible = useSelector(selectModal);
  const arrProduct = useSelector(selectAllProduct);

  return (
    <View style={{height: '100%'}}>
      <Modal animationType="slide" visible={modalVisible}>
        <Text>Chi tiết đơn hàng</Text>
        {arrProduct.length != 0 ? (
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {arrProduct.map((item, index) => (
                <View key={index}>
                  <OrderDetail item={item} />
                </View>
              ))}
              <HistoryOrder />
              <View height={70} />
            </ScrollView>
            <BtnClose />
          </View>
        ) : (
          <Loading
            uri={require('../assets/lf30_editor_fhzlpncq.json')}
            title="Dang tai"
          />
        )}
      </Modal>
    </View>
  );
};

const BtnClose = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(openOrClose());
  };
  return (
    <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
      <Ionicons
        name="close-circle"
        style={{fontSize: 50, color: COLORS.custom}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    shadowColor: '#000',
    elevation: 5,
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
});
