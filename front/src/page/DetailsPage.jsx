import { useParams } from 'react-router-dom';

import { useDetails } from '../features/details/use-details';
import { useRef } from 'react';

export const DetailsPage = () => {
  const {id} = useParams();
    const refToast = useRef(null);

  const { qty, setQty, status, error,handleAddBasket, handleAddBasketOneClick, lamp } = useDetails(id, refToast);

  return (
    <>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div className='loader'></div>}
      {status === 'received'  && (
        <>
    <div className="detailsContainer" >
      <img src={lamp.img} alt='lamp' className='detailsContainer__img' />
      <div className='specifications'>
        <h1 className='specifications__title'>{lamp.title}</h1>
        <div className="specifications__brand z-depth-1">{lamp.brand}</div>
        <div className="specifications__brand z-depth-1">{lamp.category}</div>
        <h2 className='specifications__text'>Характеристики:</h2>
        <div className="specifications__list">
        {lamp.specs.map((spec) => <>
        <div className='specifications__p grey-text text-darken-3' key={spec.name}>{spec.name} <div className='_block'></div></div><p className='specifications__p'>{spec.value}</p></>
        )}
        </div>
        <h2 className='specifications__text'>Описание:</h2> 
        <p className='specifications__p'>{lamp.description}</p>
      </div>
      <div className='addBasket z-depth-2'>
        <p className='addBasket__p'>Цена: {lamp.price * qty} руб.</p>
        <div className='addBasket__div'>
          <div className='btn white grey-text text-darken-4 btnLess' onClick={() => qty === 1 ? 1 : setQty(qty-1)}>-</div>
          <div className='addBasket__num'>{qty}</div>
          <div className='btn white grey-text text-darken-4 btnAdd' onClick={() => setQty(qty+1)}>+</div>
          <div className='btn white grey-text text-darken-4 btnBuy' onClick={() => handleAddBasket(lamp.id, qty)}>Купить</div>
        </div>
        <div className='btn white grey-text text-darken-4 btnBuyOne' onClick={() =>handleAddBasketOneClick(lamp.id, qty)}>
          Купить в 1 клик
        </div>
        <div className="addBasket__stock">
          <img src='../images/icon_box.svg' alt='box' width='18px'/>
<p className='addBasket__box grey-text text-darken-3'>на складе: {lamp.stockQuantity} шт.</p>
</div>
      </div>
      </div>
            <div className="basket__toast" ref={refToast}>Товар добавлен в корзину</div>
    </>)}
    </>
  );
};
