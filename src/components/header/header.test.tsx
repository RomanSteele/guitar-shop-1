import { render, screen } from '@testing-library/react';
import Header from './header';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeGuitars } from '../../utils/mocks/mocks';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore([thunk]);

const guitars = makeFakeGuitars(27);
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitars: guitars,
    cartGuitars: guitars,
  },
});

describe('Component: Header', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,

    );

    const headerElement = screen.getByText('Каталог');

    expect(headerElement).toBeInTheDocument();
  });
});
