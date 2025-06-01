import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadDetails, selectDetails, selectDetailsInfo } from "./details-slice";
import { addBasket } from "../basket/basket-slice";


export const useDetails = (id, refToast) => {

    const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const lamp = useSelector((state) => selectDetails(state, id)); 
  const {status, error} = useSelector(selectDetailsInfo);  

  useEffect(() => {
    if (id && !lamp) {
      dispatch(loadDetails(id));
    }
  
  }, [dispatch, id, lamp]);

  if (!lamp) {
    return (
<div className='loader'></div>
    );
  }

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
  const handleAddBasket = (id, qty) => {
    const newProduct = {id: id,  qty: qty, price: lamp.price};
    dispatch(addBasket(newProduct));
    toggleToast();
  }
  const handleAddBasketOneClick = (id, qty) => {
    const newProduct = {id: id, qty: qty, price: lamp.price};
    dispatch(addBasket(newProduct));
    navigate('/basket');
  }
  
    return { qty, setQty, status, error,handleAddBasket, handleAddBasketOneClick, lamp };
}