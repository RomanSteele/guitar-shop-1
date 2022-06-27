import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ModalWindow from './modal-window';

import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Provider } from 'react-redux';
import { createApi } from '../../../services/api';

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
    const mockGuitarName = 'fakeGuitar';
    const mockId=1;

    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    // eslint-disable-next-line testing-library/no-node-access
    const body = global.document.querySelector('body') as HTMLBodyElement ;
    body.appendChild(modalRoot);

    render(
      <BrowserRouter>
        <Provider store={mockStore({DATA:{loadingStatus: false}})}>
          <ModalWindow onBackdropClick={mockFunction} isModalVisible={mockVisible} guitarName={mockGuitarName} currentId={mockId} />
        </Provider>
      </BrowserRouter>,
    );

    const nameElement = screen.getByText('Ваше Имя');
    const advantagesElement = screen.getByText('Достоинства');
    const commentElement = screen.getByText('Комментарий');
    const formElement = screen.getByText('Отправить отзыв');

    expect(nameElement).toBeInTheDocument();
    expect(advantagesElement).toBeInTheDocument();
    expect(commentElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });
});
