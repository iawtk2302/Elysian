import {createSlice} from '@reduxjs/toolkit';

const orderDetailSlide = createSlice({
  name: 'allOrder',
  initialState: {
    values: [],
    modal: false,
    orderID: '',
    products: [],
    waitingOrders: [],
    shippingOrders: [],
    cancelledOrders: [],
    completedOrders: [],
    waitForDelete: false,
  },
  reducers: {
    setValues(state, action) {
      state.values = [...state.values, action.payload];
    },
    openOrClose(state) {
      if (state.modal == false) state.modal = true;
      else {
        state.modal = false;
        state.orderID = '';
        state.products = [];
      }
    },
    setOrderID(state, action) {
      state.orderID = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    addWaitingOrder(state, action) {
      state.waitingOrders = [...state.waitingOrders, action.payload];
    },
    resetWaitingOrder(state) {
      state.waitingOrders = [];
    },
    deleteWaitingOrder(state, action) {
      const prev = state.waitingOrders.findIndex(
        item => item.orderID === action.payload,
      );
      state.waitingOrders.splice(prev, 1);
    },
    addShippingOrder(state, action) {
      state.shippingOrders = [...state.shippingOrders, action.payload];
    },
    resetShippingOrder(state) {
      state.shippingOrders = [];
    },
    addCancelledOrder(state, action) {
      state.cancelledOrders = [...state.cancelledOrders, action.payload];
    },
    resetCancelledOrder(state) {
      state.cancelledOrders = [];
    },
    addCompletedOrder(state, action) {
      state.completedOrders = [...state.completedOrders, action.payload];
    },
    resetCompletedOrder(state) {
      state.completedOrders = [];
    },
    setTrueWaitForDelete(state) {
      state.waitForDelete = true;
    },
    setFalseWaitForDelete(state) {
      state.waitForDelete = false;
    },
  },
});
export const {
  setValues,
  openOrClose,
  setOrderID,
  setProducts,
  addWaitingOrder,
  resetWaitingOrder,
  deleteWaitingOrder,
  addShippingOrder,
  resetShippingOrder,
  addCancelledOrder,
  resetCancelledOrder,
  addCompletedOrder,
  resetCompletedOrder,
  setTrueWaitForDelete,
  setFalseWaitForDelete,
} = orderDetailSlide.actions;
export const selectAllOrder = state => state.allOrder.values;
export const selectModal = state => state.allOrder.modal;
export const selectOrderId = state => state.allOrder.orderID;
export const selectAllProduct = state => state.allOrder.products;
export const selectWaitingOrders = state => state.allOrder.waitingOrders;
export const selectShippingOrders = state => state.allOrder.shippingOrders;
export const selectCancelledOrders = state => state.allOrder.cancelledOrders;
export const selectCompletedOrders = state => state.allOrder.completedOrders;
export const selectWaitingForDelete = state => state.allOrder.waitForDelete;

export default orderDetailSlide.reducer;
