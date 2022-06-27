import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MainSort from './main-sort';

import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();


describe('component FilterClearButton', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore({
          FILTER:{  sortOrder:'',sortType:''},
        })}
        >
          <MainSort />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Сортировать/)).toBeInTheDocument();
    expect(screen.getByText(/по цене/)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/)).toBeInTheDocument();

  });
});
