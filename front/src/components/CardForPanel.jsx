import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteDetails,
    loadDetails,
    selectDetails,
    selectDetailsInfo,
    updateDetails,
} from '../features/details/details-slice';
import { selectAdmin } from '../features/autorization/autorization-slice';

export const CardForPanel = ({ id, onDelete }) => {
    const createRef = useRef(null);
    const dispatch = useDispatch();

    const lamp = useSelector((state) => selectDetails(state, id));
    const { status, error } = useSelector(selectDetailsInfo);
    const [inputs, setInputs] = useState([{ name: '', value: '' }]);

    useEffect(() => {
        if (id && !lamp) {
            dispatch(loadDetails(id));
        }
        if (lamp?.specs?.length > 0) {
            setInputs(lamp.specs.map(spec => ({ name: spec.name, value: spec.value })));
        }
    }, [dispatch, id, lamp]);

    const toggleModal = () => {
        createRef.current.style.display =
            createRef.current.style.display === 'block' ? 'none' : 'block';
    };

    const addSpecBlock = () => {
        setInputs([...inputs, { name: '', value: '' }]);
    };

    const handleNameChange = (index, val) => {
        const updatedSpecs = [...inputs];
        updatedSpecs[index].name = val;
        setInputs(updatedSpecs);
    };

    const handleValueChange = (index, val) => {
        const updatedSpecs = [...inputs];
        updatedSpecs[index].value = val;
        setInputs(updatedSpecs);
    };

    const removeLastSpecBlock = () => {
        if (inputs.length <= 1) return;
        setInputs(inputs.slice(0, -1));
    };

    const titleRef = useRef(null);
    const brandRef = useRef(null);
    const categoryRef = useRef(null);
    const descriptionRef = useRef(null);
    const stockQuantityRef = useRef(null);
    const imgRef = useRef(null);
    const priceRef = useRef(null);

    const token = useSelector(selectAdmin);

    const handleAddDetails = async () => {
        const detailsInfo = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            stockQuantity: stockQuantityRef.current.value,
            category: categoryRef.current.value,
            brand: brandRef.current.value,
            img: imgRef.current.value,
            specs: inputs.map((spe) => ({
                name: spe.name,
                value: spe.value,
            }))
        };

        try {
            await dispatch(updateDetails({detailsInfo, id, token})).unwrap();
            dispatch(loadDetails(id));
            toggleModal();
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error);

        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteDetails({ id, token })).unwrap();
            // Вызываем колбэк после успешного удаления
            if (onDelete) {
                onDelete(id);
            }
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
    };


    return (
        <>
            {error && <h2>Can`t fetch data</h2>}
            {status === 'loading' && <div className='loader'></div>}
            {status === 'received' && lamp && (
                <>
                    <div className='card'>
                        <div className='card-image'>
                            <img src={lamp.img} alt='lamp' className='card-image' />
                            <div
                                className='btn grey-text text-darken-4 btnEdit'
                                onClick={() => toggleModal()}
                            >
                                <i className='material-icons'>border_color</i>
                            </div>
                            <div
                                className='btn grey-text text-darken-4 btnTrash'
                                onClick={handleDelete}
                            >
                                <i className='material-icons'>delete</i>
                            </div>
                        </div>
                        <div className='card-content'>
                            <span className='card-title'>{lamp.price} руб.</span>
                            <p>{lamp.title}</p>
                        </div>
                    </div>

                    <div className='createCard' ref={createRef}>
                        <div className='createCard__content z-depth-2'>
              <span className='createCard__close' onClick={() => toggleModal()}>
                <i className='material-icons'>clear</i>
              </span>
                            <div className='createCard__block'>
                                <div className='createCard__text'>Название</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.title}
                                    className='createCard__input'
                                    ref={titleRef}
                                />
                                <div className='createCard__text'>Бренд</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.brand}
                                    className='createCard__input'
                                    ref={brandRef}
                                />
                                <div className='createCard__text'>Категория</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.category}
                                    className='createCard__input'
                                    ref={categoryRef}
                                />
                                <div className='createCard__text'>Описание</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.description}
                                    className='createCard__input'
                                    ref={descriptionRef}
                                />
                                <div className='createCard__text'>На складе</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.stockQuantity}
                                    className='createCard__input'
                                    ref={stockQuantityRef}
                                />
                                <div className='createCard__text'>Характеристики</div>
                                <div className="create__block--">
                                    {inputs.map((input, index) => (
                                        <div key={index} className="createCard__spec">
                                            <input
                                                type='text'
                                                placeholder='характеристика'
                                                className='createCard__spec__input'
                                                value={input.name}
                                                onChange={(e) => handleNameChange(index, e.target.value)}
                                            />
                                            <span> - </span>
                                            <input
                                                type='text'
                                                placeholder='значение'
                                                className='createCard__spec__input'
                                                value={input.value}
                                                onChange={(e) => handleValueChange(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="create__block"></div>
                                <div className="create__block">
                                    <div
                                        className='btn grey-text text-darken-4 createCard__spec__btn'
                                        onClick={addSpecBlock}
                                    >
                                        <i className='material-icons'>add</i>
                                    </div>
                                    <div className="create__block"></div>
                                    <div
                                        className='btn grey-text text-darken-4 createCard__spec__btn'
                                        onClick={removeLastSpecBlock}
                                    >
                                        <i className='material-icons'>clear</i>
                                    </div>
                                </div>
                                <div className='createCard__text'>Картинка</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.img}
                                    className='createCard__input'
                                    ref={imgRef}
                                />
                                <div className='createCard__text'>Цена</div>
                                <input
                                    type='text'
                                    defaultValue={lamp.price}
                                    className='createCard__input'
                                    ref={priceRef}
                                />
                            </div>
                            <div
                                className='createCard__btn btn grey-text text-darken-4'
                                onClick={handleAddDetails}
                            >
                                Изменить
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};