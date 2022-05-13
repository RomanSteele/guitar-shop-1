import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
