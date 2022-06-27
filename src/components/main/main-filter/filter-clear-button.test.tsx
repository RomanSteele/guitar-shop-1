import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import FilterClearButton from './filter-clear-button';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();


describe('component FilterClearButton', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore({})}>
          <FilterClearButton />
        </Provider>,
      </BrowserRouter>,
    );

    expect(screen.getByText(/Очистить/i)).toBeInTheDocument();
  });
});
