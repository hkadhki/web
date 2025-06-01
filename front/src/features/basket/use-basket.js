import { useRef } from "react";


export const useBasket = () => {
      const modalRef = useRef(null);

        const handleGetOrder = () => {
   modalRef.current.style.display = 'block'
  }

    return {modalRef, handleGetOrder};
}