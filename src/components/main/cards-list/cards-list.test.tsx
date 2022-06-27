import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import CardsList from './cards-list';
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
          <CardsList cards={mockCards} />
        </Provider>
      </BrowserRouter>,
    );

    const cardsListElement = screen.getAllByText('Всего оценок:')[0] as HTMLAnchorElement;

    expect(cardsListElement).toBeInTheDocument();

  });
});
