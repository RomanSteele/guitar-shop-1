import { Action } from 'redux';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';
import MockAdapter from 'axios-mock-adapter';

import { createApi } from '../../../services/api';
import { fetchCurrentGuitarAction } from '../../../store/api-actions';
import { loadGuitar } from '../../../store/slices/data-slice';
import { makeFakeGuitar, makeFakeGuitars, makeFakeReviews } from '../../../utils/mocks/mocks';
import { APIRoute } from '../../../const';
import {  State } from '../../../types/state';
import ProductPageContent from './product-page-content';


const id = 1;
const mockReviews = makeFakeReviews(id);
const guitarsPerPage = makeFakeGuitars(9);
const guitars = makeFakeGuitars(27);
const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: Product Page Content', () => {
  it('should dispatch fetchReviewsAction when render component', async () => {

    mockAPI
      .onGet(`${APIRoute.GuitarAndComments.replace(':id', id.toString())}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(id.toString()));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitar.toString());
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({DATA:{
          guitars: guitars,
          activeGuitar: makeFakeGuitar(),
          guitarsOnPage: guitarsPerPage,
        },
        },
        )}
        >
          <ProductPageContent />,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
