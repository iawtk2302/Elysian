import {configureStore} from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import addressReducer from './addressSlice';
import orderDetailSlide from './orderDetailSlide';

const rootReducer = {
  orders: orderReducer,
  address: addressReducer,
  allOrder: orderDetailSlide,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
