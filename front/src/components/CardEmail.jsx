import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDetails, selectDetails, selectDetailsInfo } from "../features/details/details-slice";


export const CardEmail = ({ id, qty, onClick }) => {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDetails(id));
  }, [dispatch, id]);

  const lamp = useSelector((state) => selectDetails(state, id));
  const { status, error } = useSelector(selectDetailsInfo);  

  console.log(lamp)

  return (
    <>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div className='loader'></div>}
      {status === 'received' && lamp &&(
        <>
          <div className='cardBasket z-depth-2' onClick={onClick}>
            <img
              src='images/lamp_card.avif'
              alt='lamp'
              className='cardBasket__img'
            />
            <p className='addBasket__p'>{lamp.title}</p>
            <p className='addBasket__p'>{lamp.price * qty} руб.</p>
          </div>
        </>
      )}   
    </>
  );
}