import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartModalWindow from './cart-modal-window';

import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Provider } from 'react-redux';
import { createApi } from '../../../services/api';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


describe('Component: Modal Window', () => {
  it('should render correctly', () => {
    const mockFunction = () => null;
    const mockVisible = true;
    const mockCard = makeFakeGuitar();

    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    // eslint-disable-next-line testing-library/no-node-access
    const body = global.document.querySelector('body') as HTMLBodyElement ;
    body.appendChild(modalRoot);

    render(
      <BrowserRouter>
        <Provider store={mockStore({DATA:{loadingStatus: false}})}>
          <CartModalWindow onBackdropClick={mockFunction} isModalVisible={mockVisible} card={mockCard} />
        </Provider>
      </BrowserRouter>,
    );

    const addElement = screen.getByText('Добавить товар в корзину');
    const fakeElement = screen.getByText('fake');
    const artElement = screen.getByText('Артикул: fakeGuitar');

    expect(addElement).toBeInTheDocument();
    expect(fakeElement).toBeInTheDocument();
    expect(artElement).toBeInTheDocument();
  });
});
