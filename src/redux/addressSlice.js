import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    value: {},
    selected: 0,
    checked: false,
  },
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setChecked: state => {
      if (state.checked === false) state.checked = true;
      else state.checked = false;
    },
  },
});

export const {setValue, setSelected, setChecked} = addressSlice.actions;
export const selectedAddress = state => state.address.value;
export const selectedID = state => state.address.selected;
export const selectChecked = state => state.address.checked;

export default addressSlice.reducer;
