import {View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import COLORS from '../common/Color';
import {changeNote, selectNote} from '../redux/orderSlice';
import {useDispatch, useSelector} from 'react-redux';

const Note = () => {
  const dispatch = useDispatch();
  const note = useSelector(selectNote);
  return (
    <View style={{marginTop: 15}}>
      <TextInput
        placeholder="Ghi chú cho đơn hàng"
        value={note}
        onChangeText={note => dispatch(changeNote(note))}
        activeUnderlineColor={COLORS.custom}
        style={{backgroundColor: 'white', height: 40}}
      />
    </View>
  );
};

export default Note;
