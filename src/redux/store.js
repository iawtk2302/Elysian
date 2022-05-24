import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './orderSlice'
import addressReducer from './addressSlice'
const rootReducer={
    orders: orderReducer,
    address: addressReducer,
}

const store=configureStore({
    reducer:rootReducer
})

export default store;