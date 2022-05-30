import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import CardsList from './cards-list';
import { Action } from 'redux';
import { State } from '../../../types/store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api } from '../../../store';
import { Provider } from 'react-redux';

describe('Component: Cards List', () => {
  it('should render correctly', () => {
    const mockCards = makeFakeGuitars(27);

    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

    render(
      <BrowserRouter>
        <Provider store= {mockStore()}>
          <CardsList cards={mockCards} />
        </Provider>
      </BrowserRouter>,
    );

    const cardsListElement = screen.getAllByText('Всего оценок:')[0] as HTMLAnchorElement;

    expect(cardsListElement).toBeInTheDocument();

  });
});
