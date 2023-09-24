import { Action } from 'redux';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';
import MockAdapter from 'axios-mock-adapter';

import { createApi } from '../../../services/api';
import { fetchGuitarsAction } from '../../../store/api-actions';
import { fakeSortString, makeFakeGuitar, makeFakeGuitars } from '../../../utils/mocks/mocks';
import { APIRoute } from '../../../const';
import { State } from '../../../types/state';
import CartPageContent from './cart-page-content';


const mockGuitars = makeFakeGuitars(27);
const mockGuitarsPerPage = makeFakeGuitars(9);
const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: Main Page Content', () => {
  it('should dispatch fetchGuitarsAction when render component', async () => {

    mockAPI
      .onGet(APIRoute.GuitarsAndComments)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(fetchGuitarsAction.pending.toString());
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({DATA:{
          guitars: mockGuitars,
          cartGuitars:mockGuitars,
          activeGuitar: makeFakeGuitar(),
          guitarsOnPage: mockGuitarsPerPage,
          language: 'russian',
        },FILTER:{sortType:fakeSortString},
        },
        )}
        >
          <CartPageContent />,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('Введите свой промокод, если он у вас есть.')).toBeInTheDocument();
  });
});
