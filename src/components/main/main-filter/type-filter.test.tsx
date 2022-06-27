import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import TypeFilter from './type-filter';
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
          },FILTER:{  filterType: ''},
        })}
        >
          <TypeFilter />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/i)).toBeInTheDocument();
  });
});
