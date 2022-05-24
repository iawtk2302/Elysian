import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
      addProduct: (state, action) => {
        state.push(action.payload)  
      },
    }
  })

export const { addProduct } = orderSlice.actions

export default orderSlice.reducer