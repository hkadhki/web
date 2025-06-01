import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Card } from '../../components/Card';
import { loadLamp, selectLampList, selectLampListInfo } from './popular-slice';


export const PopularList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lampList = useSelector(selectLampList);
  const { status, error } = useSelector(selectLampListInfo);

  useEffect(() => {
    dispatch(loadLamp())
  }, [])

  return (
    <>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <div className='loader'></div>}
      {status === 'received' && lampList?.length > 0 && (
        <div className='list'>
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
              <Card
                key={lampId}
                onClick={() => navigate(`/details/${lampId}`)}
                {...lampInfo}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
