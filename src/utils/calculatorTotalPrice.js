import {useDispatch, useSelector} from 'react-redux';
import { removeVoucher } from '../redux/voucherSlice';

export default function calculatorTotalPrice() {
  const arrProduct = useSelector(state => state.orders.list);
  const voucher=useSelector(state=>state.voucher)
  const dispatch=useDispatch()
  let totalPrice = 0;
  for (let item of arrProduct) {
    totalPrice += parseInt(item.total);
  }
  if(voucher==={}){
    return totalPrice
  }
  else{
    if(voucher.type=='total'){
      if(totalPrice<voucher.condition){
        dispatch(removeVoucher())
      }
      else
      totalPrice-=voucher.discount
    }
  }
  return totalPrice;
}
export const calculatorTotal=()=> {
  const arrProduct = useSelector(state => state.orders.list);
  let totalPrice = 0;
  for (let item of arrProduct) {
    totalPrice += parseInt(item.total);
  }
  return totalPrice;
}
