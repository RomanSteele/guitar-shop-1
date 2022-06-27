import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MainFilter from './main-filter';
import { makeFakeGuitars} from '../../../utils/mocks/mocks';
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
          },FILTER:{sortType: '',
            sortOrder: '',
            filterType: '',
            filterPriceLow: '',
            filterPriceTop: '',
            filterString: ''},
        })}
        >
          <MainFilter />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByText(6)).toBeInTheDocument();
    expect(screen.getByText(7)).toBeInTheDocument();
    expect(screen.getByText(12)).toBeInTheDocument();
    expect(screen.getByText(/Очистить/i)).toBeInTheDocument();
  });
});
