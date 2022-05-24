import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'address',
    initialState: {},
    reducers: {
      changeAddress: (state, action) => {
          
      },
    }
  })

export const { changeAddress } = addressSlice.actions

export default addressSlice.reducer