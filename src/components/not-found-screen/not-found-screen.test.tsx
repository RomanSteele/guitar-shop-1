import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import NotFoundScreen from './not-found-screen';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeFakeGuitars } from '../../utils/mocks/mocks';

const mockStore = configureMockStore([thunk]);

const guitars = makeFakeGuitars(27);
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitars: guitars,
    cartGuitars: guitars,
  },
});

describe('Component: Not Found Screen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>,
    );

    const notFoundScreenElement = screen.getByText('404 - Not Found!');

    expect(notFoundScreenElement).toBeInTheDocument();
  });
});
