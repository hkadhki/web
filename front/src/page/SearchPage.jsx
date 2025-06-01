import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  loadSearch,
  selectSearch,
  selectSearchInfo,
  selectSearchList,
} from '../features/search/search-slice';
import { Card } from '../components/Card';
import { useEffect } from 'react';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useSelector(selectSearch);
  const { status, error } = useSelector(selectSearchInfo);
  const list = useSelector(selectSearchList);

  useEffect(() => {
    if (search.length > 0) dispatch(loadSearch(search));
  }, [dispatch, search]);

  return (
    <div className='searchPage'>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div class="loader"></div> }
      {status === 'received' && list?.length > 0 && (
        <div className='list'>
          {list.map((lamp) => {
            const lampId = lamp.id;
            const lampInfo = {
              title: lamp.title,
              price: lamp.price,
              img: lamp.img,
            };
            if (!lampId) return null;
            return (
              <Card
                key={lampId}
                onClick={() => navigate(`/details/${lampId}`)}
                {...lampInfo}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
