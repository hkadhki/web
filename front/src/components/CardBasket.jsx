import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadDetails,
  selectDetails,
  selectDetailsInfo,
} from '../features/details/details-slice';
import { addBasket, removeBasket } from '../features/basket/basket-slice';

export const CardBasket = ({ id, qty, onClick }) => {
  const dispatch = useDispatch();

  const [newQty, setNewQty] = useState(qty)

  useEffect(() => {
    dispatch(loadDetails(id));
  }, [dispatch, id]);

  const lamp = useSelector((state) => selectDetails(state, id));
  const { status, error } = useSelector(selectDetailsInfo);  


const handleAddQty = (e) => {
  e.stopPropagation();
  setNewQty(newQty+1);
  const addQty = {id: id, qty: newQty+1, price: lamp.price}
  dispatch(addBasket(addQty))
}  
const handleRemoveQty = (e) => {
  e.stopPropagation();
    const updatedQty = newQty - 1;
    if (updatedQty <= 0) {
      dispatch(removeBasket({id: id}));
    } else {
      setNewQty(updatedQty);
      dispatch(addBasket({id: id, qty: updatedQty, price: lamp.price }));
    }
} 

  console.log(lamp);
  return (
    <>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div className='loader'></div>}
      {status === 'received' && lamp &&(
        <>
          <div className='cardBasket z-depth-2' onClick={onClick}>
            <img
              src={lamp.img}
              alt='lamp'
              className='cardBasket__img'
            />
            <p className='addBasket__p'>{lamp.title}</p>
            <div className='addBasket__div'>
              <div className='btn white grey-text text-darken-4 btnLessBasket' onClick={(e) => handleRemoveQty(e)}>-</div>
              <div className='addBasket__numBasket'>{newQty}</div>
              <div className='btn white grey-text text-darken-4 btnAddBasket' onClick={(e) => handleAddQty(e)}>+</div>
            </div>
            <p className='addBasket__p'>{lamp.price * newQty} руб.</p>
          </div>
        </>
      )}   
    </>
  );
};
