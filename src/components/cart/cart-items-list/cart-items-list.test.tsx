import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import CardItemsList from './cart-items-list';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

describe('Component: Cards List', () => {
  it('should render correctly', () => {
    const mockCards = makeFakeGuitars(27);

    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      DATA: {
        guitars:mockCards,
        cartGuitars:mockCards,
        loadingStatus: false,
        guitarsOnPage: [],
        activeGuitar: mockCards[0],
        guitarsOfSearch: [],
        isLoading: false,
      },
    });

    render(
      <BrowserRouter>
        <Provider store= {store}>
          <CardItemsList />
        </Provider>
      </BrowserRouter>,
    );

    const cardsListElement = screen.getAllByText('Артикул: fake')[0] as HTMLAnchorElement;

    expect(cardsListElement).toBeInTheDocument();

  });
});
