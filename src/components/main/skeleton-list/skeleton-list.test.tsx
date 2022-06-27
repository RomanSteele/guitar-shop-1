import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../history-route/history-route';
import SkeletonList from './skeleton-list';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('component CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SkeletonList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
