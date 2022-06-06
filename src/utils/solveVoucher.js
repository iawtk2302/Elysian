import {useDispatch, useSelector} from 'react-redux';
export const calculatorTotal=()=> {
    const arrProduct = useSelector(state => state.orders.list);
    let totalPrice = 0;
    for (let item of arrProduct) {
      totalPrice += parseInt(item.total);
    }
    return totalPrice;
  }
  export const TotalAmount=()=> {
    const arrProduct = useSelector(state => state.orders.list);
    let totalAmount = 0;
    for (let item of arrProduct) {
        totalAmount += parseInt(item.count);
    }
    return totalAmount;
  }