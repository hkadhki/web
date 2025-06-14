import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './page/HomePage';
import { CatalogPage } from './page/CatalogPage';
import { DetailsPage } from './page/DetailsPage';
import { BasketPage } from './page/BasketPage';
import { PanelPage } from './page/PanelPage';
import { SearchPage } from './page/SearchPage';
import { SearchEmailPage } from './page/SearchEmailPage';
import { AdminOrder } from './page/AdminOrder';

function App() {
  return (
    <>

    <Header />
    <main className='main'>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/catalog' element={<CatalogPage />}/>
            <Route path='/search' element={<SearchPage />} />
            <Route path='/details/:id' element={<DetailsPage />} />
            <Route path='/basket' element={<BasketPage />} />
            <Route path='/admin' element={<PanelPage />} />
            <Route path='/order' element={<SearchEmailPage />} />
            <Route path='/admin/order' element={<AdminOrder />} />
          </Routes>
        </main>

    </>
  );
}

export default App;
