import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { fakeSortString, makeFakeGuitar, makeFakeGuitars } from '../../../utils/mocks/mocks';
import CartPage from './cart-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { Provider } from 'react-redux';

const mockGuitarsPerPage = makeFakeGuitars(9);
const mockGuitars = makeFakeGuitars(27);
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];


const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


describe('Component: Main Page', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Provider store={mockStore({DATA:{
          guitars: mockGuitars,
          cartGuitars:mockGuitars,
          activeGuitar: makeFakeGuitar(),
          guitarsOnPage: mockGuitarsPerPage,
        },FILTER:{sortType: fakeSortString}},
        )}
        >
          <CartPage />
        </Provider>
      </BrowserRouter>,
    );

    const mainElement = screen.getByText('Всего:');
    const footerElement = screen.getByText('Скидка:');
    const headerElement = screen.getByText('К оплате:');

    expect(footerElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
