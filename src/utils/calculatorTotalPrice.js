import {useSelector} from 'react-redux';

export default function calculatorTotalPrice() {
  const arrProduct = useSelector(state => state.orders);
  let totalPrice = 0;
  for (let item of arrProduct) {
    totalPrice += parseInt(item.total);
  }
  return totalPrice;
}
