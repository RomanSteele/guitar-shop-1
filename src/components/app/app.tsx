import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main/main-page/main-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductPage from '../product/product-page/product-page';


function App(): JSX.Element {

  return (
    <BrowserRouter >
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
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
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
