import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar, makeFakeGuitars } from '../../../utils/mocks/mocks';
import ProductPage from './product-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { Provider } from 'react-redux';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const guitarsPerPage = makeFakeGuitars(9);
const guitars = makeFakeGuitars(27);
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: Product Page', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Provider store={mockStore({
          DATA:{
            guitars: guitars,
            activeGuitar: makeFakeGuitar(),
            cartGuitars: guitars,
            guitarsOnPage: guitarsPerPage,
          },
        })}
        >
          <ProductPage />
        </Provider>
      </BrowserRouter>,
    );

    const singleProductElement = screen.getByText('Товар');
    const footerElement = screen.getByText('г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6.');
    const headerElement = screen.getByText('О компании');

    expect(footerElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(singleProductElement).toBeInTheDocument();
  });
});
