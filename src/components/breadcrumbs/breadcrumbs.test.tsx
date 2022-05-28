import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../utils/mocks/mocks';
import Breadcrumbs from './breadcrumbs';

const mockStore = configureMockStore();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const guitars = makeFakeGuitars(27);

    render(
      <BrowserRouter>
        <Provider store={mockStore({
          guitars: guitars,
        })}
        >
          <Breadcrumbs />
        </Provider>,
      </BrowserRouter>,
    );

    const breadcrumbsElement = screen.getByText('Главная');

    expect(breadcrumbsElement).toBeInTheDocument();
  });
});
