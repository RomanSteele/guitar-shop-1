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
import { loadGuitars } from '../../../store/actions';
import { makeFakeGuitar, makeFakeGuitars, makeFakeReviews } from '../../../utils/mocks/mocks';
import { APIRoute } from '../../../const';
import { State } from '../../../types/store';
import MainPageContent from './main-page-content';


const id = 1;
const mockGuitars = makeFakeGuitars(27);
const mockReviewsByGuitar = makeFakeReviews(id);
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
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          guitars: mockGuitars,
          activeGuitar: makeFakeGuitar(),
          reviews: mockReviewsByGuitar,
          guitarsOnPage: mockGuitarsPerPage,
        },
        )}
        >
          <MainPageContent />,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });
});
