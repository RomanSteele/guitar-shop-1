import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar, makeFakeGuitars } from '../../../utils/mocks/mocks';
import MainPage from './main-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/store';
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
        <Provider store={mockStore({
          guitars: mockGuitars,
          activeGuitar: makeFakeGuitar(),
          guitarsOnPage: mockGuitarsPerPage,
        },
        )}
        >
          <MainPage />
        </Provider>
      </BrowserRouter>,
    );

    const mainElement = screen.getByText('Каталог гитар');
    const footerElement = screen.getByText('г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6.');
    const headerElement = screen.getByText('О компании');

    expect(footerElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
