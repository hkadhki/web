import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CardForPanel } from '../components/CardForPanel';
import {
  createLamp,
  loadLamp,
  selectLampList,
  selectLampListInfo,
} from '../features/lamp/lamp-slice';
import { Autorization } from '../features/autorization/Autorization';
import { selectAdmin } from '../features/autorization/autorization-slice';



export const PanelPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const addRef = useRef(null);

  const lampList = useSelector(selectLampList);
  const { status, error } = useSelector(selectLampListInfo);


    const handleDeleteCard = (deletedId) => {
        // Можно добавить оптимистичное обновление или просто перезагрузить список
        dispatch(loadLamp());
    };

  const [inputs, setInputs] = useState([ { name: '', value: '' } ]);

  useEffect(() => {
    dispatch(loadLamp());
  }, []);

  
    const toggleModal = () => {
        console.log('сработало')
    addRef.current.style.display =
      addRef.current.style.display === 'block' ? 'none' : 'block';
  };
    // Добавление нового блока характеристик
  const addSpecBlock = () => {
    setInputs([...inputs, { name: '', value: '' } ]);
  };

  // Обновление характеристики
  const handleNameChange = (index, val) => {
    const updatedSpecs = [...inputs];
   updatedSpecs[index].name = val;
    setInputs(updatedSpecs);
  };

  // Обновление значения
  const handleValueChange = (index, val) => {
    const updatedSpecs = [...inputs];
    updatedSpecs[index].value = val;
    setInputs(updatedSpecs);
  };
const removeLastSpecBlock = () => {
  if (inputs.length <= 1) return; // Не удаляем, если остался только один блок
  setInputs(inputs.slice(0, -1)); // Удаляем последний элемент массива
};

const titleRef = useRef(null);
const brandRef = useRef(null);
const categoryRef = useRef(null);
const descriptionRef = useRef(null);
const stockQuantityRef = useRef(null);
const specsNameRef = useRef(null);
const specsValueRef = useRef(null);
const imgRef = useRef(null);
const priceRef = useRef(null);

const token = useSelector(selectAdmin)
    const handleAddCard = async () => {
        const cardInfo = {
            'brand': brandRef.current.value,
            'category': categoryRef.current.value,
            'description': descriptionRef.current.value,
            'img': imgRef.current.value,
            'price': priceRef.current.value,
            'stockQuantity': stockQuantityRef.current.value,
            'title': titleRef.current.value,
            'specs': inputs.map((spe) => ({
                'name': spe.name,
                'value': spe.value,
            }))
        };

        try {
            await dispatch(createLamp({cardInfo, token})).unwrap();
            // После успешного добавления:
            dispatch(loadLamp()); // Перезагружаем список
            toggleModal(); // Закрываем модальное окно
            // Очищаем форму (опционально)
            setInputs([{ name: '', value: '' }]);
            titleRef.current.value = '';
            brandRef.current.value = '';
            // ... очистка остальных полей
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
        }
    };
  return (
    <>
      <div className='panel'>
        <div className='blank'></div>
        <div className='btn grey-text text-darken-4 btnAddPanel' onClick={() => toggleModal()}>Добавить</div>
        <div className='btn grey-text text-darken-4 btnCreatePanel' onClick={() => navigate('/admin/order')}>
          Управление заказами
        </div>
        {error && <h2>Can`t fetch data</h2>}
              {status === 'loading' && <div className='loader'></div>}
              {status === 'received' && lampList?.length > 0 && (
                <div className='cardPanel'>
                  {lampList.map((lamp) => {
                    const lampId = lamp.id;
                    const lampInfo = {
                        title: lamp.title,
                        price: lamp.price,
                        id: lamp.id,
                        img: lamp.img,
                    }
                    if (!lampId) return null;
                    return (
                      <CardForPanel
                        key={lampId}
                        onDelete={handleDeleteCard}
                        onClick={() => navigate(`/details/${lampId}`)}
                        {...lampInfo}
                      />
                    );
                  })}
                </div>
              )}
      </div>
     <Autorization />
    <div className='addCard' ref={addRef}>
            <div className='createCard__content z-depth-2'>
              <span className='createCard__close' onClick={() => toggleModal()}>
                <i className='material-icons'>clear</i>
              </span>    
              <div className='createCard__block'>
                      <div className='createCard__text'>Название</div>
                <input
                  type='text'
                  placeholder='название'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={titleRef}
                />
               <div className='createCard__text'>Бренд</div>
                <input
                  type='text'
                  placeholder='бренд'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={brandRef}
                />
                <div className='createCard__text'>Категория</div>
                <input
                  type='text'
                  placeholder='категория'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={categoryRef}
                />
                <div className='createCard__text'>Описание</div>
                <input
                  type='text'
                  placeholder='описание'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={descriptionRef}
                />
                 <div className='createCard__text'>На складе</div>
                <input
                  type='text'
                  placeholder='количество'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={stockQuantityRef}
                />
                <div className='createCard__text'>Характеристики</div>
                <div className="create__block--">  
                     {inputs.map((spec, index) => ( 
                        <div key={index} className="createCard__spec">
                   <input
                  type='text'
                  placeholder='характеристика'
                  className='createCard__spec__input'
                  onInvalid={(e) => e.preventDefault()}
                 value={spec.name}
                 onChange={(e) => handleNameChange(index, e.target.value)} 
                  ref={specsNameRef}
                /> 
                <span> - </span>
                <input
                  type='text'
                  placeholder='значение'
                  className='createCard__spec__input'
                  onInvalid={(e) => e.preventDefault()}
                  value={spec.value}
                 onChange={(e) => handleValueChange(index, e.target.value)} 
                  ref={specsValueRef}
                />  
                </div>
                ))}
                </div>
                <div className="create__block">   </div>
                   <div className="create__block">         
              <div className='btn grey-text text-darken-4 createCard__spec__btn' onClick={addSpecBlock}>
                <i className='material-icons'>add</i>
              </div>
              <div className="create__block"></div>
                <div className='btn grey-text text-darken-4 createCard__spec__btn' onClick={removeLastSpecBlock}>
                <i className='material-icons'>clear</i>
              </div> 
                </div>
                <div className='createCard__text'>Картинка</div>
                <input
                  type='text'
                  placeholder='ссылка'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={imgRef}
                />
                <div className='createCard__text'>Цена</div>
                <input
                  type='text'
                  placeholder='цена'
                  className='createCard__input'
                  onInvalid={(e) => e.preventDefault()}
                  ref={priceRef}
                />
              </div>
              <div
                className='createCard__btn btn grey-text text-darken-4'
                onClick={handleAddCard}
              >
                Добавить
              </div>
            </div>
          </div>
    </>
  );
};
