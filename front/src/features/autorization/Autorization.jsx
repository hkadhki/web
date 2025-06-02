import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAutorization, selectAdminInfo } from './autorization-slice';

export const Autorization = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector(selectAdminInfo);

  const modalRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    modalRef.current.style.display = 'block';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    emailRef.current.style.border = '1px solid #eabb59';
    passwordRef.current.style.border = '1px solid #eabb59';

    const dataAdmin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(emailRef.current.value)
    ) {
      emailRef.current.style.border = '1px solid #A52A2A';
      return;
    }

    dispatch(loadAutorization(dataAdmin));

  };

   useEffect(() => {
    if (status === 'rejected') {
      alert("неверный email или пароль");
    } 
    if (status === 'created') {
      modalRef.current.style.display = 'none';
    }
  }, [status, error]); 

  return (
    <>
      <div className='registerAdmin' ref={modalRef}>
        <div className='registerAdmin__content z-depth-2'>
          <div className='registerAdmin__text'>Войдите в аккаунт</div>
          <input
            type='email'
            placeholder='email'
            className='registerAdmin__input'
            onInvalid={(e) => e.preventDefault()}
            ref={emailRef}
          />
          <input
            type='password'
            placeholder='пароль'
            className='registerAdmin__input'
            onInvalid={(e) => e.preventDefault()}
            ref={passwordRef}
          />
          <div
            className='registerAdmin__btn btn grey-text text-darken-4'
            onClick={(e) => handleSubmit(e)}
          >
            Войти
          </div>
        </div>
      </div>
    </>
  );
};
