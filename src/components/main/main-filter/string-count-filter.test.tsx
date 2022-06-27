import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import StringCountFilter from './string-count-filter';
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
          },FILTER:{  filterString:''},
        })}
        >
          <StringCountFilter />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByText(6)).toBeInTheDocument();
    expect(screen.getByText(7)).toBeInTheDocument();
    expect(screen.getByText(12)).toBeInTheDocument();
  });
});
