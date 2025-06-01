import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeBasket, selectBasket } from '../features/basket/basket-slice';
import { useRef } from 'react';

export const Card = ({ title, price, id, img, onClick }) => {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);

  const refAddToast = useRef(null);

  const toggleToast = () => {
    if (refAddToast.current) {
      refAddToast.current.classList.add('show');
      setTimeout(() => {
        if (refAddToast.current) {
          refAddToast.current.classList.remove('show');
        }
      }, 3000);
    }
  };

  const handleAddBasket = (e, id) => {
    e.stopPropagation();
      const existingProduct = basket.find(item => item.id === id);

    if (existingProduct) {
            const newProduct = { id: id};
      dispatch(removeBasket(newProduct));
    } else {
      const newProduct = { id: id, qty: 1, price: price };
    dispatch(addBasket(newProduct));
    toggleToast();
  }
  };

  return (
    <>
      <div className='card' onClick={onClick}>
        <div className='card-image'>
          <img src={img} alt='lamp' className='card-image'/>
          <div
            className='btn-floating halfway-fab card-icon'
            onClick={(e) => handleAddBasket(e, id)}
          >
            <i className='material-icons grey-text text-darken-4'>
              {basket.some((lamp) => lamp.id === id) ? 'done' : 'add'}
            </i>
          </div>
        </div>
        <div className='card-content'>
          <span className='card-title'>{price} руб.</span>
          <p>{title}</p>
        </div>
      </div>
      <div className='basket__toast' ref={refAddToast}>
        Товар добавлен в корзину
      </div>
    </>
  );
};
