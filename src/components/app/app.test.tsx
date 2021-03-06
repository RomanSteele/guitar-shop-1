import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AppRoute} from '../../const';
import App from './app';
import { fakeSortString, makeFakeGuitars } from '../../utils/mocks/mocks';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../services/api';
import HistoryRouter from '../history-route/history-route';

const mockHistory = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockGuitars = makeFakeGuitars(27);
const mockGuitarsPerPage = makeFakeGuitars(9);
const history = createMemoryHistory();


const mockStore = configureMockStore<
State,
Action,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeApp = (
  <Provider store={mockStore({DATA:{guitars: mockGuitars, guitarsOnPage: mockGuitarsPerPage,cartGuitars: mockGuitars},FILTER:{sortType:fakeSortString}})}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/main/1"', () => {
    mockHistory.push(AppRoute.MainFirstPage);

    render(fakeApp);

    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/guitars/1"', () => {
    const id= String(1);
    mockHistory.push(AppRoute.Guitar.replace(':id', id));

    render(fakeApp);

    expect(screen.getByText('Начать поиск')).toBeInTheDocument();
  });

});
