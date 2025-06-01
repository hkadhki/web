import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearSearch,
  selectSearch,
  setSearch,
} from '../features/search/search-slice';

export const Header = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const newValue = e.target.value;
    if (search !== newValue) {
      dispatch(setSearch(newValue));
    }
  };

  return (
    <nav className='header grey'>
      <Link
        to='/'
        className='header__logo'
        onClick={() => dispatch(clearSearch())}
      >

          <img src='../images/logo.png' alt='logo' width='106px' />

      </Link>
      <Link to='/catalog'>

        <div className='header__catalog'>
                  <img
          src='../images/icon_catalog.svg'
          alt='basket'
          width='18px'
          className='header__catalog__icon'
        />
          Каталог
          </div>
      </Link>
      <Link to='/search'>
      <div className="header__search">
        <input
          type='search'
          className='header__search__input'
          placeholder='Поиск'
          onChange={handleSearch}
        />
        <div className="header__search__btn">
        <img
          src='../images/icon_search.svg'
          alt='search'
          width='18px'
          className='header__search__icon'
        />
        </div>
        </div>
      </Link>
      <Link to='/order ' className='header__order'>
        <img
          src='../images/icon_order.svg'
          alt='order'
          width='20px'
          className='header__order__icon'
        />
        заказы
      </Link>
      <Link to='/basket ' className='header__basket'>
        <img
          src='../images/icon_basket.svg'
          alt='basket'
          width='20px'
          className='header__basket__icon'
        />
        кopзина
      </Link>
    </nav>
  );
};
