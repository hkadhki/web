import {Carousel} from '../components/Carousel';
import {PopularList} from "../features/popular/PopularList";

export const HomePage = () => {
  return (
    <>
      <Carousel />
      <h4 className='text-darken-4'>Популярное</h4>
      <PopularList />
    </>
  );
};
