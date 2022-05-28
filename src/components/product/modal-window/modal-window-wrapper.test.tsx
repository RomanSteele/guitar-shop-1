import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ModalWindowWrapper from './modal-window-wrapper';

import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/store';
import { Provider } from 'react-redux';
import { createApi } from '../../../services/api';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


describe('Component: Modal Window Wrapper', () => {
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
        <Provider store={mockStore({loadingStatus: false})}>
          <ModalWindowWrapper onBackdropClick={mockFunction} isModalVisible={mockVisible} guitarName={mockGuitarName} id={mockId} />
        </Provider>
      </BrowserRouter>,
    );

    const modalWrapperElement = screen.getByText('fakeGuitar');

    expect(modalWrapperElement).toBeInTheDocument();
  });
});


