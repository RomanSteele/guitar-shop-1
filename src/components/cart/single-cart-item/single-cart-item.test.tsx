import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import SingleCartItem from './single-cart-item';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

describe('Component: Single Catalogue Card', () => {
  it('should render correctly', () => {
    const singleCard = makeFakeGuitars(3)[0];
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
          <SingleCartItem item={singleCard} />
        </Provider>
      </BrowserRouter>,
    );

    const singleCardElement = screen.getByText('Артикул: fake');

    expect(singleCardElement).toBeInTheDocument();
  });
});
