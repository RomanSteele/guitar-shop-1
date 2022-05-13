import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
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
