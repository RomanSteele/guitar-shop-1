import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main/main-page/main-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductPage from '../product/product-page/product-page';


function App(): JSX.Element {

  return (
    <BrowserRouter >
      <Routes>
        <Route
          index
          element={<Navigate to={AppRoute.MainFirstPage}/>}
        />
        <Route
          path={AppRoute.CurrentMainPage}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Guitar}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.GuitarCharacteristics}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.GuitarDescription}
          element={<ProductPage />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
