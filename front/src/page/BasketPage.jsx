import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectBasket } from '../features/basket/basket-slice';
import { CardBasket } from '../components/CardBasket';
import { useBasket } from '../features/basket/use-basket';
import { useRef } from 'react';
import { createOrder } from '../features/getOrder/getOrder-slice';

export const BasketPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);

  const emailRef = useRef(null);
  const refToast = useRef(null);

  const { modalRef, handleGetOrder } = useBasket();

  const totalPrice = basket.reduce((sum, product) => {
    return sum + product.price * product.qty;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailRef.current.style.border = '1px solid #c0c0c0';

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(emailRef.current.value)
    ) {
      emailRef.current.style.border = '1px solid #A52A2A';
      return;
    }
    const newOrder = {
      email: emailRef.current.value,
      totalAmount: totalPrice,
      items: basket.map((item) => ({
        productId: item.id,
        quantity: item.qty,
        priceAtPurchase: item.price,
      })),
    };
    toggleToast();
    dispatch(createOrder(newOrder));
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  const toggleToast = () => {
    if (refToast.current) {
      refToast.current.classList.add('show');
      setTimeout(() => {
        if (refToast.current) {
          refToast.current.classList.remove('show');
        }
      }, 3000);
    }
  };
  return (
    <>
      <div className='basket'>
        <div className='basketList'>
          {basket.length > 0 ? basket.map((card) => {
            const lampid = card.id;
            const lampInfo = {
              qty: card.qty,
              id: card.id,
            };
            console.log(lampid);
            if (!lampid) return null;
            return (
              <CardBasket
                key={lampid}
                onClick={() => navigate(`/details/${lampid}`)}
                {...lampInfo}
              />
            );
          }) : <h1 className='shadow-text'>Здесь будут ваши товары</h1>}
        </div>
        <div className='basketBuy z-depth-2'>
          <div className='basketBuy__p'>
            Итого: <div className='basketBuy__pr'>{totalPrice} руб. </div>
          </div>
          <div
            className='btn white grey-text text-darken-4 btnBuyOne'
            onClick={handleGetOrder}
          >
            Перейти к оформлению
          </div>
        </div>
      </div>
      <div className='getOrder' ref={modalRef}>
        <div className='getOrder__content z-depth-2'>
          <span className='getOrder__close' onClick={() => closeModal()}>
            <i class='material-icons'>clear</i>
          </span>
          <div className='getOrder__text'>Введите email:</div>
          <input
            type='email'
            placeholder='email'
            className='getOrder__input'
            onInvalid={(e) => e.preventDefault()}
            ref={emailRef}
          />
          <div className='basketBuy__p'>
            Итого: <div className='basketBuy__pr'>{totalPrice} руб. </div>
          </div>
          <div
            className='getOrder__btn btn white grey-text text-darken-4'
            onClick={(e) => handleSubmit(e)}
          >
            Заказать
          </div>
        </div>
      </div>
      <div className='basket__toast' ref={refToast}>
        Товар успешно оформлен
      </div>
    </>
  );
};
