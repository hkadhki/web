import { useDispatch, useSelector } from 'react-redux';
import {
  loadSearchEmail,
  selectEmailInfo,
  selectOrderForEmail,
  setEmail,
} from '../features/searchEmail/searchEmail-slice';

export const SearchEmailPage = () => {
  const dispatch = useDispatch();



  const handleSearch = (e) => {
    const newValue = e.target.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(newValue)) {
      return;
    }
    dispatch(setEmail(newValue));
    dispatch(loadSearchEmail(newValue));
  };

  const orders = useSelector(selectOrderForEmail);
  const {status, error} = useSelector(selectEmailInfo)

  console.log(orders)

  return (
    <>
    <h3 className='order__h'>Введите email: </h3>
    <div className="order__search">
        <input
          type='search'
          placeholder='email'
          className='order__search__input'
          onChange={(e) => handleSearch(e)}
        />
                <div className="order__search__btn">
        <img
          src='../images/icon_search.svg'
          alt='search'
          width='18px'
          className='order__search__icon'
        />
        </div>
   </div>     
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div className='loader'></div>}
      {status === 'received' && orders.length > 0 &&(
        orders.map((order =>
         <div className='searchEmail__order z-depth-2'>
          <div className="searchEmail__order__info">
          <p className='order__p'>Заказ №{order.id}</p>
          <p className='order__p'>Оформлен на {order.email}</p>
          <p className='order__p'>Статус: {order.status}</p>
          </div>
        <div className='searchEmail__order__products'>
          {order.items.map((product) => {
            return (
              <>
              <div><p className='order__p'>{product.productDto.title}</p>
              <p className='order__p'>{product.quantity}шт. x {product.productDto.price} руб.</p>
              </div>
              <div className='order__p'>= {product.priceAtPurchase * product.quantity} руб.</div>
              
             </> 
            );
          })}
        </div>
        <div className='searchEmail__totalPrice'>
          <p className='order__p'>Кол-во товаров:</p>
          <p className='order__p'>{order.items.reduce((sum,product) => {
    return sum + product.quantity;
  }, 0)}</p>
          <p className='order__p'>Итог:</p>
          <p className='order__p'>{order.totalAmount} руб.</p>
        </div>
      </div>))
    )}
    </>
  );
};
