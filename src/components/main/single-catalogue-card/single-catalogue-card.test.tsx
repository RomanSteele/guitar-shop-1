import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import SingleCatalogueCard from './single-catalogue-card';
import { Action } from 'redux';
import { State } from '../../../types/store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api } from '../../../store';

describe('Component: Single Catalogue Card', () => {
  it('should render correctly', () => {
    const singleCard = makeFakeGuitars(3)[0];
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


    render(
      <BrowserRouter>
        <Provider store= {mockStore()}>
          <SingleCatalogueCard card={singleCard} />
        </Provider>
      </BrowserRouter>,
    );

    const singleCardElement = screen.getByText('Всего оценок:');

    expect(singleCardElement).toBeInTheDocument();
  });
});
