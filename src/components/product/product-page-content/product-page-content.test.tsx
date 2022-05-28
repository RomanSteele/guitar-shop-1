import { Action } from 'redux';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';
import MockAdapter from 'axios-mock-adapter';

import { createApi } from '../../../services/api';
import { fetchReviewsAction } from '../../../store/api-actions';
import { loadReviews } from '../../../store/actions';
import { makeFakeGuitar, makeFakeGuitars, makeFakeReviews } from '../../../utils/mocks/mocks';
import { APIRoute } from '../../../const';
import { State } from '../../../types/store';
import ProductPageContent from './product-page-content';


const id = 1;
const mockReviews = makeFakeReviews(id);
const mockReviewsByGuitar = makeFakeReviews(id);
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
      .onGet(`${APIRoute.Guitars}/${id}/comments`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          guitars: guitars,
          activeGuitar: makeFakeGuitar(),
          reviews: mockReviewsByGuitar,
          guitarsOnPage: guitarsPerPage,
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
