import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import SearchForm from './search-form';
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
          },FILTER:{  guitarsOfSearch:fakeGuitars},
        })}
        >
          <SearchForm />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Начать поиск/)).toBeInTheDocument();

  });
});
