import {createSlice} from '@reduxjs/toolkit';

const orderDetailSlide = createSlice({
  name: 'allOrder',
  initialState: {
    values: [],
  },
  reducers: {
    setValues(state, action) {
      state.values = [...state.values, action.payload];
    },
  },
});
export const {setValues} = orderDetailSlide.actions;
export const selectAllOrder = state => state.allOrder.values;
export default orderDetailSlide.reducer;
