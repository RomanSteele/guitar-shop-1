import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import PriceFilter from './price-filter';
import {makeFakeGuitars} from '../../../utils/mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

const fakeGuitars = makeFakeGuitars(27);


describe('component FilterClearButton', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore({
          DATA: {
            guitars: fakeGuitars,
          },FILTER:{  filterPriceLow: '',
            filterPriceTop: ''},
        })}
        >
          <PriceFilter />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
  });
});
