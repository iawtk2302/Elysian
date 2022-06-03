import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import addressReducer from './addressSlice';
import orderDetailSlide from './orderDetailSlide';
import voucherSlice from './voucherSlice';

const rootReducer = {
  orders: orderReducer,
  address: addressReducer,
  allOrder: orderDetailSlide,
  voucher:voucherSlice
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export default store;
