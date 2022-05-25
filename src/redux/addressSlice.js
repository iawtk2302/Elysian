import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    value: {},
    selected: 0,
  },
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const {setValue, setSelected} = addressSlice.actions;
export const selectedAddress = state => state.address.value;
export const selectedID = state => state.address.selected;

export default addressSlice.reducer;