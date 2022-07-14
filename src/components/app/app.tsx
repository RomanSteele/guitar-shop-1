import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import CartPage from '../cart/cart-page/cart-page';
import MainPage from '../main/main-page/main-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ProductPage from '../product/product-page/product-page';


function App(): JSX.Element {

  return (
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
        path="*"
        element={<NotFoundScreen />}
      />
      <Route
        path={AppRoute.CartPage}
        element={<CartPage />}
      />
    </Routes>
  );
}

export default App;
