import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import addressReducer from './addressSlice';
import orderDetailSlide from './orderDetailSlide';
import voucherSlice from './voucherSlice';
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
const rootReducer=combineReducers({
  orders: orderReducer,
  address: addressReducer,
  allOrder: orderDetailSlide,
  voucher:voucherSlice
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export let persistor = persistStore(store);

